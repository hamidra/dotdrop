import { useContext } from 'react';
import { Row, Col, Card, Form } from 'react-bootstrap';
import { ClaimContext } from './ClaimMain';
import CardHeader from '../../../components/CardHeader';
import { useSubstrate } from '../../../substrate-lib';
import { Formik } from 'formik';
import { stringHelpers } from '../../../utils';
import analytics from '../../../analytics';

export default function VerifySecret({ claimGiftHandler, processing }) {
  const { prevStep } = useContext(ClaimContext);
  const redeemHandler = (redeemSecret) => {
    // ToDO: add better input validation to verify redeemSecret is not empty,
    // and is indeed a valid mnemonic phrase
    redeemSecret = stringHelpers.removeSpaces(redeemSecret);
    if (redeemSecret) {
      claimGiftHandler(redeemSecret);
    }
  };
  const { giftTheme } = useSubstrate();
  const validate = ({ redeemSecret }) => {
    redeemSecret = stringHelpers.removeSpaces(redeemSecret);
    const errors = {};
    const error = stringHelpers.validateGiftSecret(redeemSecret);
    if (error) {
      errors.redeemSecret = error;
    }
    return errors;
  };
  return (
    <>
      <Card.Body className="d-flex flex-column">
        <CardHeader
          title={'Claim Your Gift'}
          cardText={[
            'Enter the ',
            <b>gift secret</b>,
            ' you received to claim your gift.',
          ]}
          backClickHandler={prevStep}
        />
        <Formik
          initialValues={{
            redeemSecret: '',
          }}
          validate={validate}
          onSubmit={(values, actions) => {
            redeemHandler(values.redeemSecret);
            actions.setSubmitting(false);
          }}
        >
          {(props) => (
            <>
              <Row className="pt-4 justify-content-center align-items-center">
                <Col>
                  <Form autoComplete="off" className="w-100">
                    <Form.Group>
                      <Form.Label htmlFor="redeemSecret">
                        Gift Secret
                      </Form.Label>
                      <Form.Control
                        id="redeemSecret"
                        name="redeemSecret"
                        type="input"
                        isInvalid={
                          props.touched.redeemSecret &&
                          !!props.errors.redeemSecret
                        }
                        value={props.values.redeemSecret}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                      />
                      {
                        <Form.Text className="danger">
                          {props.touched.redeemSecret &&
                          !!props.errors.redeemSecret
                            ? props.errors.redeemSecret
                            : ''}
                        </Form.Text>
                      }
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
              <div className="d-flex flex-grow-1" />
              <Row className=" pt-5 justify-content-center align-items-center">
                <Col className="d-flex justify-content-center">
                  <button
                    className="btn btn-primary"
                    disabled={
                      (props.touched.redeemSecret &&
                        !!props.errors.redeemSecret) ||
                      processing
                    }
                    onClick={() => {
                      if (!props.isSubmitting) {
                        analytics.track('claim_clicked');
                        props.submitForm();
                      }
                    }}
                  >
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
