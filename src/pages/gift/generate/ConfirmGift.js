import { useContext, useState } from 'react';
import { Row, Col, Card, Form } from 'react-bootstrap';
import CardHeader from '../../../components/CardHeader';
import { useSubstrate, utils } from '../../../substrate-lib';
import { stringHelpers } from '../../../utils';
import { GenerateContext } from './GenerateMain';
import config from '../../../config';

export default function ConfirmGift ({ giftInfo, generateGiftHandler }) {
  const { email, name, amount, secret } = giftInfo || {};

  const { giftTheme, chainInfo } = useSubstrate();
  const formattedSecret = secret && stringHelpers.formatGiftSecret(secret);
  const { prevStep } = useContext(GenerateContext);
  const amountStr = amount && utils.formatBalance(amount, chainInfo?.token, 5);

  const checkboxLabel = 'I have stored the gift secret in a safe place.';
  const [checked, setChecked] = useState(false);
  const [checkedError, setCheckedError] = useState('');
  const checkedErrorMessage =
    'Please confirm you have stored the gift secret, to be able to manage your gift in the future.';

  return (
    <>
      <Card.Body className="d-flex flex-column">
        <CardHeader
          title={'Confirm Gift Details'}
          cardText={[
            'Please confirm the details below to generate the gift and write down the ',
            <b>gift secret</b>,
            ' to be able to manage your gift in the future.'
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
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="mb-1">
                    <b>Gift Secret</b>
                  </div>
                  <div className={checkedError ? 'text-danger' : ''}>{formattedSecret}</div>
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
          {checkedError && (
            <Form.Text className="text-danger">{checkedError}</Form.Text>
          )}
        </div>
        <div className="d-flex flex-grow-1" />
        <div className="d-flex justify-content-center mt-1">
          <button
            className="btn btn-primary"
            disabled={!!checkedError}
            onClick={() =>
              !checked
                ? setCheckedError(checkedErrorMessage)
                : generateGiftHandler()
            }>
            Generate Gift
          </button>
        </div>
      </Card.Body>
    </>
  );
}
