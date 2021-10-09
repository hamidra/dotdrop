import { useContext, useState, useEffect } from 'react';
import { Row, Col, Form, Card, InputGroup } from 'react-bootstrap';
import CardHeader from '../../../components/CardHeader';
import { GenerateContext } from './GenerateMain';
import { useSubstrate, utils } from '../../../substrate-lib';
import { Formik } from 'formik';
import config from '../../../config';
import BN from 'bn.js';
import analytics from '../../../analytics';

export default function GenerateGift ({
  account,
  initialGiftInfo,
  setGiftInfoHandler,
  giftFeeMultiplier // this can be 0 or 1 and specifies if a gift provider charges fees or the gifts are free.
}) {
  const { api, apiState, chainInfo, giftTheme } = useSubstrate();

  const { prevStep } = useContext(GenerateContext);

  const [balance, setBalance] = useState(null);
  const [txFee, setTxFee] = useState(null);
  const [amountWarning, setAmountWarning] = useState(null);

  const balanceDecimalPoints = 5;
  const balanceVal = balance?.free
    ? utils.fromChainUnit(
      balance.free,
      chainInfo?.decimals,
      balanceDecimalPoints
    )
    : null;
  const balanceStr =
    balanceVal && utils.formatBalance(balanceVal, chainInfo?.token);

  useEffect(() => {
    let unsub;
    setBalance(null);
    account?.address &&
      api?.query?.system &&
      api.query.system
        .account(account.address, (accountInfo) => {
          const balance = accountInfo?.data;
          setBalance(balance);
          console.log(
            `free balance is ${balance?.free} with ${balance?.reserved} reserved and a nonce of ${accountInfo?.nonce}`
          );
        })
        .then((result) => {
          unsub = result;
        })
        .catch((error) => {
          console.log(error);
        });

    return () => unsub && unsub();
  }, [api, apiState, account, chainInfo]);

  useEffect(() => {
    // since the txFees does not differ much for different amounts,
    // to be safe and efficient we just calculate the maximum possible txFee for the whole available balance of the account
    async function fetchTxFee () {
      const address = account?.address;
      if (address) {
        const info = await api.tx.balances
          .transfer(address, balance?.free || 0)
          .paymentInfo(address);

        const estimatedFee = utils.calcFeeAdjustments(info.partialFee);
        setTxFee(estimatedFee);
      }
    }
    fetchTxFee();
  }, [api, apiState, account, chainInfo, balance]);

  const checkAmountWarning = (amount) => {
    const amountFloat = !isNaN(amount) && parseFloat(amount);

    const maxAmount = config?.MAX_AMOUNT?.toString();
    const maxAmountFloat = !isNaN(maxAmount) && parseFloat(maxAmount);
    const maxAmountStr =
      maxAmountFloat && utils.formatBalance(maxAmount, chainInfo?.token);
    const isTooHigh =
      amountFloat && maxAmountFloat && amountFloat > maxAmountFloat;
    if (isTooHigh) {
      setAmountWarning(
        `⚠️ The gift amount is higher than ${maxAmountStr}. Direct account transactions are recommended for high amounts.`
      );
    } else {
      setAmountWarning(null);
    }
  };

  const validateGiftAmount = (amount) => {
    const giftChainAmount = utils.toChainUnit(amount, chainInfo.decimals);
    // if the fees are applied the sender needs to pay 2 transaction fees.
    // one txfee for tx sender_account->gift_account and one txfee for tx from gift_account->recipient_account
    const totalTxFees = new BN(txFee || 0, 10).muln(giftFeeMultiplier).muln(2);
    // this is the amount that will be deducted from sender account
    const totalChainAmount = giftChainAmount?.add(totalTxFees);
    // validate gift amount
    if (!amount) {
      return 'Please enter the gift amount';
    }
    if (giftChainAmount) {
      // check if the gift amount is above existential deposit
      const minChainGiftAmount = chainInfo?.existentialDeposit;
      if (giftChainAmount.lt(minChainGiftAmount)) {
        const minGiftAmount = utils.fromChainUnit(
          minChainGiftAmount,
          chainInfo.decimals
        );
        const minGiftAmountError = `The amount is below ${minGiftAmount} ${chainInfo?.token}, the existential deposit for the ${chainInfo?.chainName} network.`;
        return minGiftAmountError;
      }
    }
    if (totalChainAmount && balance) {
      // check if the account has enough funds to pay the gift amount and fees
      const minRequiredBalance = totalChainAmount;
      if (balance?.free?.lt(minRequiredBalance)) {
        const freeBalance = utils.fromChainUnit(
          balance?.free,
          chainInfo.decimals,
          balanceDecimalPoints
        );
        const fees = utils.fromChainUnit(
          totalTxFees,
          chainInfo.decimals,
          balanceDecimalPoints
        );
        const minAvailableBalanceError = `The account balance of ${freeBalance} ${chainInfo.token} is not enough to pay the gift amount of ${amount} ${chainInfo.token} plus fees of (${fees} ${chainInfo.token})`;
        return minAvailableBalanceError;
      }
    }
    checkAmountWarning(amount);
  };

  const validate = ({ recipientName, amount }) => {
    const errors = {};
    const maxNameLength = 50;
    if (recipientName && recipientName.length > maxNameLength) {
      errors.recipientName = `Recipient name can not be more than ${maxNameLength} characters`;
    }
    const amountError = validateGiftAmount(amount);
    if (amountError) {
      errors.amount = amountError;
    }
    return errors;
  };

  const _setAmount = (value, formik) => {
    const pattern = /^([0-9]+\.?[0-9]*)?$/i;
    formik.setFieldValue(
      'amount',
      pattern.test(value) ? value : formik.values.amount
    );
  };

  return (
    <>
      <Card.Body className="d-flex flex-column">
        <CardHeader
          title="Gift Details"
          cardText={`Enter the recipient’s name and the amount of ${giftTheme?.content} you would like to send.`}
          backClickHandler={() => prevStep()}
        />
        <Formik
          initialValues={{
            amount: initialGiftInfo?.amount || '',
            recipientName: initialGiftInfo?.name || ''
          }}
          validate={validate}
          onSubmit={({ recipientName, amount }, actions) => {
            setGiftInfoHandler({
              recipientName,
              amount
            });
          }}>
          {(props) => (
            <>
              <Row className="flex-column align-items-center">
                <Col className="d-flex justify-content-center align-items-center pt-4">
                  <Form autoComplete="off" className="w-100">
                    <Form.Group>
                      <Form.Label htmlFor="recipientName">
                        Recipient Name
                      </Form.Label>
                      <Form.Control
                        id="recipientName"
                        name="recipientName"
                        type="text"
                        autoComplete="off"
                        placeholder=""
                        value={props.values.recipientName}
                        isInvalid={
                          props.touched.recipientName &&
                          !!props.errors.recipientName
                        }
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                      />
                      {props.touched.recipientName &&
                        !!props.errors.recipientName && (
                          <Form.Text className="text-danger">
                            {props.errors.recipientName}
                          </Form.Text>
                      )}
                    </Form.Group>

                    <Form.Group>
                      <Form.Label htmlFor="amount">Amount</Form.Label>
                      <InputGroup>
                        <Form.Control
                          id="amount"
                          name="amount"
                          type="text"
                          autoComplete="off"
                          placeholder=""
                          style={
                            props.touched.amount && !!props.errors.amount
                              ? { borderColor: 'red' }
                              : {}
                          }
                          className="border-right-0"
                          value={props.values.amount}
                          onChange={(e) => {
                            _setAmount(e.target.value, props);
                          }}
                          onBlur={props.handleBlur}
                        />
                        <InputGroup.Append>
                          <InputGroup.Text
                            style={{
                              ...(props.touched.amount && !!props.errors.amount
                                ? { borderColor: 'red' }
                                : {})
                            }}
                            className="bg-transparent border-left-0 balance-text text-wrap">
                            {balanceStr
                              ? `${balanceStr} available`
                              : `${chainInfo?.token}`}
                          </InputGroup.Text>
                        </InputGroup.Append>
                      </InputGroup>

                      {props.touched.amount && !!props.errors.amount
                        ? (
                        <Form.Text className="text-danger">
                          {props?.errors?.amount}
                        </Form.Text>
                          )
                        : (
                            amountWarning && (
                          <Form.Text className="text-warning">
                            {amountWarning}
                          </Form.Text>
                            )
                          )}
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
              <div className="d-flex flex-grow-1" />
              <div className="d-flex justify-content-center">
                <button
                  className="btn btn-primary"
                  disabled={!props?.isValid}
                  onClick={() => {
                    analytics.track('generate_form_filled');
                    props.submitForm();
                  }}>
                  Next
                </button>
              </div>
            </>
          )}
        </Formik>
      </Card.Body>
    </>
  );
}
