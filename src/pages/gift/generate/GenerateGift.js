import { useContext, useState, useEffect } from 'react';
import { Row, Col, Form, Card, InputGroup } from 'react-bootstrap';
import CardHeader from '../../../components/CardHeader';
import { GenerateContext } from './GenerateMain';
import { useSubstrate, utils } from '../../../substrate-lib';
import { useFormik } from 'formik';
import BN from 'bn.js';
export default function GenerateGift ({
  account,
  generateGiftHandler,
  giftFeeMultiplier // this can be 0 or 1 and specifies if a gift provider charges fees or the gifts are free.
}) {
  const { api, apiState, chainInfo, giftTheme } = useSubstrate();

  const { prevStep } = useContext(GenerateContext);

  const [balance, setBalance] = useState(null);
  const [txFee, setTxFee] = useState(null);
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
  };

  const validate = ({ recipientEmail, confirmEmail, amount }) => {
    const errors = {};
    if (
      !recipientEmail ||
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(recipientEmail)
    ) {
      errors.recipientEmail = 'Please enter a valid email.';
    } else if (recipientEmail !== confirmEmail) {
      errors.confirmEmail = "The email addresses did'nt match.";
    }
    const amountError = validateGiftAmount(amount);
    if (amountError) {
      errors.amount = amountError;
    }
    return errors;
  };

  const _setAmount = (value) => {
    const pattern = /^([0-9]+\.?[0-9]{0,5})?$/i;
    formik.setValues({
      ...formik.values,
      amount: pattern.test(value) ? value : formik.values.amount
    });
  };

  const formik = useFormik({
    initialValues: {
      amount: '',
      recipientEmail: '',
      confirmEmail: ''
    },
    validate,
    onSubmit: ({ recipientEmail, amount }) => {
      generateGiftHandler({
        recipientEmail,
        amount
      });
    }
  });

  return (
    <>
      <Card.Body className="d-flex flex-column">
        <CardHeader
          title={`Gift ${giftTheme?.content}`}
          cardText={`Send ${giftTheme?.content} to your friends and family, and have them join the
          ${giftTheme?.network} Network today.`}
          backClickHandler={() => prevStep()}
        />
        <Row className="flex-column align-items-center">
          <Col className="d-flex justify-content-center align-items-center pt-4">
            <Form
              autoComplete="off"
              className="w-100"
              onSubmit={formik.handleSubmit}>
              <Form.Group className="row">
                <Col md="6">
                  <Form.Label htmlFor="recipientEmail">
                    Recipient Email
                  </Form.Label>
                  <Form.Control
                    id="recipientEmail"
                    name="recipientEmail"
                    type="email"
                    autoComplete="off"
                    placeholder=""
                    value={formik.values.recipientEmail}
                    isInvalid={
                      formik.touched.recipientEmail &&
                      !!formik.errors.recipientEmail
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.recipientEmail &&
                    !!formik.errors.recipientEmail && (
                      <Form.Text className="text-danger">
                        {formik.errors.recipientEmail}
                      </Form.Text>
                  )}
                </Col>
                <Col md="6" className="mt-2 mt-md-0">
                  <Form.Label htmlFor="confirmEmail">
                    Confirm Recipient Email
                  </Form.Label>
                  <Form.Control
                    id="confirmEmail"
                    name="confirmEmail"
                    type="email"
                    autoComplete="nope"
                    placeholder=""
                    value={formik.values.confirmEmail}
                    isInvalid={
                      formik.touched.confirmEmail &&
                      !!formik.errors.confirmEmail
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.confirmEmail &&
                    !!formik.errors.confirmEmail && (
                      <Form.Text className="text-danger">
                        {formik.errors.confirmEmail}
                      </Form.Text>
                  )}
                </Col>
              </Form.Group>

              <Form.Group>
                <Form.Label htmlFor="amount">Amount</Form.Label>
                <InputGroup>
                  <Form.Control
                    id="amount"
                    name="amount"
                    type="text"
                    autoComplete="nope"
                    placeholder=""
                    style={
                      formik.touched.amount && !!formik.errors.amount
                        ? { borderColor: 'red' }
                        : {}
                    }
                    className="border-right-0"
                    value={formik.values.amount}
                    onChange={(e) => {
                      _setAmount(e.target.value);
                    }}
                    onBlur={formik.handleBlur}
                  />
                  <InputGroup.Append>
                    <InputGroup.Text
                      style={{
                        ...(formik.touched.amount && !!formik.errors.amount
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

                {formik.touched.amount && !!formik.errors.amount && (
                  <Form.Text className="text-danger">
                    {formik?.errors?.amount}
                  </Form.Text>
                )}
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <div className="d-flex flex-grow-1" />
        <div className="d-flex justify-content-center">
          <button
            className="btn btn-primary"
            onClick={() => formik.submitForm()}>
            Generate Gift
          </button>
        </div>
      </Card.Body>
    </>
  );
}
