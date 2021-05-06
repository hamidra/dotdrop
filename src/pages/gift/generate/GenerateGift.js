import { useContext, useState } from 'react';
import { Row, Col, Form, Card } from 'react-bootstrap';
import Button from '../../../components/CustomButton';
import CardHeader from '../../../components/CardHeader';
import { GenerateContext } from './GenerateMain';
export default function GenerateGift({ account, generateGiftHandler }) {
  const { prevStep } = useContext(GenerateContext);

  const [formValues, setFormValues] = useState({
    amount: '',
    email: '',
    confirmEmail: '',
  });
  const [formErrors, setFormErrors] = useState({
    amount: '',
    email: '',
    confirmEmail: '',
  });

  const validate = () => {
    const errors = {};
    let isValid = true;
    const { email, confirmEmail, amount } = formValues;
    if (!email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      isValid = false;
      errors.email = 'Please enter a valid email.';
    } else if (email != confirmEmail) {
      isValid = false;
      errors.confirmEmail = "The email addresses did'nt match.";
    }

    if (!amount) {
      isValid = false;
      errors.amount = 'Please enter the gift amount';
    }
    setFormErrors({ ...formErrors, ...errors });
    return isValid;
  };
  const _generateGiftHandler = () => {
    const { email, amount } = formValues;
    validate() && generateGiftHandler({ email, amount });
  };
  return (
    <>
      <Card.Body>
        <CardHeader title={'Gift Dots'} backClickHandler={() => prevStep()} />

        <Row className="justify-content-center flex-column align-items-center pt-4">
          <Col>
            <p className="text-center">
              Send DOTs to your friends and familiy, and have them join the
              Polkadot Network today.
            </p>
          </Col>
          <Col className="d-flex justify-content-center align-items-center pt-4">
            <Form autoComplete="off" className="w-100">
              <Form.Group className="row" controlId="formGroupEmail">
                <Col md="6">
                  <Form.Label>Recipient Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder=""
                    value={formValues?.email}
                    isInvalid={formErrors?.email}
                    onChange={(e) => {
                      setFormErrors({ ...formErrors, email: '' });
                      setFormValues({ ...formValues, email: e.target.value });
                    }}
                  />
                </Col>
                <Col md="6" className="mt-2 mt-md-0">
                  <Form.Label>Confirm Recipient Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder=""
                    value={formValues?.confirmEmail}
                    isInvalid={formErrors?.confirmEmail}
                    onChange={(e) => {
                      setFormErrors({ ...formErrors, confirmEmail: '' });
                      setFormValues({
                        ...formValues,
                        confirmEmail: e.target.value,
                      });
                    }}
                  />
                </Col>
                <div className="w-100" />
                <Col>
                  {(formErrors?.email || formErrors?.confirmEmail) && (
                    <Form.Text className="text-danger">
                      {formErrors?.email || formErrors?.confirmEmail}
                    </Form.Text>
                  )}
                </Col>
              </Form.Group>

              <Form.Group controlId="formGroupEmail">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="number"
                  placeholder=""
                  value={formValues?.amount}
                  isInvalid={formErrors?.amount}
                  onChange={(e) => {
                    setFormErrors({ ...formErrors, amount: '' });
                    setFormValues({ ...formValues, amount: e.target.value });
                  }}
                />
                {formErrors?.amount && (
                  <Form.Text className="text-danger">
                    {formErrors?.amount}
                  </Form.Text>
                )}
              </Form.Group>
            </Form>
          </Col>
          <Col className="d-flex justify-content-center p-4">
            <Button onClick={() => _generateGiftHandler()}>
              Generate Gift
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </>
  );
}
