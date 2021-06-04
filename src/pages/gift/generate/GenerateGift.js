import { useContext, useState, useEffect } from 'react';
import { Row, Col, Form, Card, InputGroup } from 'react-bootstrap';
import Button from '../../../components/CustomButton';
import CardHeader from '../../../components/CardHeader';
import { GenerateContext } from './GenerateMain';
import { useSubstrate, utils } from '../../../substrate-lib';
import { useFormik } from 'formik';
import * as Yup from 'yup';
export default function GenerateGift ({ account, generateGiftHandler }) {
  const { api, apiState, chainInfo } = useSubstrate();

  const { prevStep } = useContext(GenerateContext);

  const [balance, setBalance] = useState(null);
  const balanceDecimalPoints = 2;

  useEffect(() => {
    let unsub;
    setBalance(null);
    account?.address &&
      utils.validateAddress(account.address, chainInfo?.ss58Format) &&
      api?.query?.system &&
      api.query.system
        .account(account.address, ({ nonce, data: balance }) => {
          setBalance(balance);
          console.log(
            `free balance is ${balance.free} with ${balance.reserved} reserved and a nonce of ${nonce}`
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

  const validate = ({ recipientEmail, confirmEmail, amount }) => {
    const errors = {};
    const chainAmount = utils.toChainUnit(amount, chainInfo.decimals);

    if (
      !recipientEmail ||
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(recipientEmail)
    ) {
      errors.recipientEmail = 'Please enter a valid email.';
    } else if (recipientEmail !== confirmEmail) {
      errors.confirmEmail = "The email addresses did'nt match.";
    }

    if (!amount) {
      errors.amount = 'Please enter the gift amount';
    }

    // check if the gift amount is above existential deposit
    if (
      chainAmount &&
      chainInfo?.existentialDeposit &&
      !utils.gteChainUnits(chainAmount, chainInfo.existentialDeposit)
    ) {
      const minDeposit = utils.fromChainUnit(
        chainInfo.existentialDeposit,
        chainInfo.decimals
      );
      errors.amount = `The amount is below ${minDeposit} ${chainInfo.token}, the existential deposit for a Polkadot account.`;
    }

    // check if the account has enough funds to pay the gift amount
    if (
      balance?.free &&
      chainAmount &&
      !utils.gteChainUnits(balance?.free, chainAmount)
    ) {
      const freeBalance = utils.fromChainUnit(
        balance?.free,
        chainInfo.decimals,
        balanceDecimalPoints
      );
      errors.amount = `The account balance of ${freeBalance} ${chainInfo.token} is not anough to pay the gift amount of ${amount} ${chainInfo.token}`;
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
      generateGiftHandler({ recipientEmail, amount });
    }
  });

  return (
    <>
      <Card.Body className="d-flex flex-column">
        <CardHeader
          title={'Gift Dots'}
          cardText="Send DOTs to your friends and familiy, and have them join the
            Polkadot Network today."
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
                      className="bg-transparent border-left-0 balance-text">
                      {balance?.free
                        ? `${utils.fromChainUnit(
                            balance.free,
                            chainInfo?.decimals,
                            balanceDecimalPoints
                          )} ${chainInfo?.token} available`
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
          <Button
            onClick={() => formik.submitForm()}
            disabled={!formik.isValid}>
            Generate Gift
          </Button>
        </div>
      </Card.Body>
    </>
  );
}
