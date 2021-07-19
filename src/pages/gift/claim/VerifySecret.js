import { useContext, useState } from 'react';
import { Row, Col, Card, Form } from 'react-bootstrap';
import { ClaimContext } from './ClaimMain';
import CardHeader from '../../../components/CardHeader';
import { useSubstrate } from '../../../substrate-lib';
import { Formik } from 'formik';

export default function VerifySecret ({ claimGiftHandler }) {
  const { prevStep } = useContext(ClaimContext);
  const redeemHandler = (redeemSecret) => {
    // ToDO: add better input validation to verify redeemSecret is not empty,
    // and is indeed a valid mnemonic phrase
    if (redeemSecret) {
      claimGiftHandler(redeemSecret);
    }
  };
  const { giftTheme } = useSubstrate();
  const validate = ({ redeemSecret }) => {
    const errors = {};
    if (!redeemSecret || !/^[\w ]+$/i.test(redeemSecret)) {
      errors.redeemSecret = 'Please enter a valid gift secret.';
    }
    return errors;
  };
  return (
    <>
      <Card.Body className="d-flex flex-column">
        <CardHeader
          title={'Claim Your Gift'}
          cardText={`Every ${giftTheme?.network} account needs a minimum balance to be active on the network. 
          Enter the secret hash you have received to claim your gift and fund your account.`}
          backClickHandler={prevStep}
        />
        <Formik
          initialValues={{
            redeemSecret: ''
          }}
          validate={validate}
          onSubmit={(values, actions) => {
            redeemHandler(values.redeemSecret);
            actions.setSubmitting(false);
          }}>
          {(props) => (
            <>
              <Row className="pt-4 justify-content-center align-items-center">
                <Col>
                  <Form autoComplete="off" className="w-100">
                    <Form.Group>
                      <Form.Label htmlFor="redeemSecret">
                        Secret Gift Hash
                      </Form.Label>
                      <Form.Control
                        id="redeemSecret"
                        name="redeemSecret"
                        type="input"
                        placeholder="0x4rt6..."
                        isInvalid={
                          props.touched.redeemSecret &&
                          !!props.errors.redeemSecret
                        }
                        value={props.values.redeemSecret}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                      />
                      {props.touched.redeemSecret &&
                        !!props.errors.redeemSecret && (
                          <Form.Text style={{ color: 'red' }}>
                            {props.errors.redeemSecret}
                          </Form.Text>
                      )}
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
              <div className="d-flex flex-grow-1" />
              <Row className=" pt-5 justify-content-center align-items-center">
                <Col className="d-flex justify-content-center">
                  <button
                    className="btn btn-primary"
                    onClick={() => !props.isSubmitting && props.submitForm()}>
                    Claim Gift
                  </button>
                </Col>
              </Row>
            </>
          )}
        </Formik>
      </Card.Body>
    </>
  );
}
