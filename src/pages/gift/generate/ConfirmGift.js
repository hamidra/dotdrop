import { useContext, useState, useEffect } from 'react';
import { Row, Col, Card, Form } from 'react-bootstrap';
import CardHeader from '../../../components/CardHeader';
import { useSubstrate, utils } from '../../../substrate-lib';
import { stringHelpers } from '../../../utils';
import { GenerateContext } from './GenerateMain';
import config from '../../../config';
import analytics from '../../../analytics';

export default function ConfirmGift ({
  account,
  giftInfo,
  generateGiftHandler,
  giftFeeMultiplier
}) {
  const { email, name, amount, secret, fee } = giftInfo || {};

  const { api, apiState, giftTheme, chainInfo } = useSubstrate();
  const [giftFee, setGiftFee] = useState(null);
  const formattedSecret = secret && stringHelpers.formatGiftSecret(secret);
  const { prevStep } = useContext(GenerateContext);

  useEffect(() => {
    async function fetchTxFee () {
      try {
        const address = account?.address;
        if (address && api) {
          const chainAmount = utils.toChainUnit(amount, chainInfo?.decimals);
          const transferTx = api.tx.balances.transfer(
            address,
            chainAmount || 0
          );
          const remarkTx = api.tx.system.remarkWithEvent('gift::create');
          const txs = [transferTx, remarkTx];
          const info = await api.tx.utility.batchAll(txs).paymentInfo(address);

          let estimatedFee = utils.calcFeeAdjustments(info?.partialFee);
          estimatedFee = estimatedFee.muln(giftFeeMultiplier);
          const fee = utils.fromChainUnit(estimatedFee, chainInfo?.decimals);
          setGiftFee(fee);
        }
      } catch (err) {
        console.log(`error while loading gift fees: ${err}`);
      }
    }
    fetchTxFee();
  }, [api, apiState, account, chainInfo]);

  const amountStr = amount && utils.formatBalance(amount, chainInfo?.token, 5);
  const feeStr = giftFee && utils.formatBalance(giftFee, chainInfo?.token, 5);

  const checkboxLabel = 'I have stored the gift secret in a safe place.';
  const [checked, setChecked] = useState(false);
  const [checkedError, setCheckedError] = useState('');
  const checkedErrorMessage = 'Please confirm you have stored the gift secret.';

  return (
    <>
      <Card.Body className="d-flex flex-column">
        <CardHeader
          title={'Confirm Gift Details'}
          cardText={[
            'Please confirm the details below to generate the gift and write down the ',
            <b>gift secret</b>,
            '.'
          ]}
          backClickHandler={() => prevStep()}
        />
        <Row className="justify-content-center align-items-center">
          <Col>
            <div className="container border rounded p-4">
              <Row className="mb-4">
                <Col xs={12} sm={6}>
                  <div className="mb-1">
                    <b>Recipient Name</b>
                  </div>
                  <div>{name}</div>
                </Col>
                <Col xs={12} sm={6}>
                  <div className="mb-1">
                    <b>Gift Amount</b>
                  </div>
                  <div>{amountStr}</div>
                  <small className="text-muted">
                    {feeStr ? `+ ${feeStr} fees` : '+ gift fees'}
                  </small>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="mb-1">
                    <b>Gift Secret</b>
                  </div>
                  <div>{formattedSecret}</div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        <div className="flex-row justify-content-start align-items-center px-2 pt-2">
          <Form.Check
            type="checkbox"
            value={checked}
            label={checkboxLabel}
            isInvalid={!!checkedError}
            onChange={(e) => {
              setCheckedError('');
              setChecked(e.target.checked);
            }}
          />
          <Form.Text className="danger ml-0">{checkedError || ''}</Form.Text>
        </div>
        <div className="d-flex flex-grow-1" />
        <div className="d-flex justify-content-center mt-1">
          <button
            className="btn btn-primary"
            disabled={!!checkedError}
            onClick={() => {
              if (!checked) {
                setCheckedError(checkedErrorMessage);
              } else {
                analytics.track('generate_confirmed');
                generateGiftHandler();
              }
            }}
          >
            Generate Gift
          </button>
        </div>
      </Card.Body>
    </>
  );
}
