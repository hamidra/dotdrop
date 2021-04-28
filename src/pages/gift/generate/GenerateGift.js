import { useContext, useState } from 'react';
import { Row, Col, Form, Card } from 'react-bootstrap';
import Button from '../../../components/CustomButton';
import CardHeader from '../../../components/CardHeader';
import { GenerateContext } from './GenerateMain';
export default function GenerateGift({ account, generateGiftHandler }) {
  const { prevStep } = useContext(GenerateContext);
  const [amount, setAmount] = useState('');
  const [amountError, setAmountError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const validate = () => {
    let error = false;
    if (!email) {
      error = true;
      setEmailError('Please enter a valid email');
    }
    if (!amount) {
      error = true;
      setAmountError('Please enter the gift value');
    }
    return !error;
  };
  return (
    <>
      <Card.Body>
        <CardHeader title={'Gift Dots'} backClickHandler={() => prevStep()} />

        <Row className="justify-content-center align-items-center">
          <Col className="d-flex flex-column justify-content-center align-items-center">
            <p className="text-center">
              Send DOTs to your friends and familiy, and have them join the
              Polkadot Network today.
            </p>
            <Form autoComplete="off" className="w-100">
              <Form.Group className="row" controlId="formGroupEmail">
                <Col md="6">
                  <Form.Label>Recipient Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Bob"
                    value={email}
                    onChange={(e) => {
                      setEmailError('');
                      setEmail(e.target.value);
                    }}
                  />
                </Col>
                <Col md="6" className="mt-2 mt-md-0">
                  <Form.Label>Confirm Recipient Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Bob"
                    value={email}
                    onChange={(e) => {
                      setEmailError('');
                      setEmail(e.target.value);
                    }}
                  />
                </Col>
                <div className="w-100" />
                <Col>
                  {emailError && (
                    <Form.Text style={{ color: 'red' }}>{emailError}</Form.Text>
                  )}
                </Col>
              </Form.Group>

              <Form.Group controlId="formGroupEmail">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="10"
                  value={amount}
                  onChange={(e) => {
                    setAmountError('');
                    setAmount(e.target.value);
                  }}
                />
                {amountError && (
                  <Form.Text style={{ color: 'red' }}>{amountError}</Form.Text>
                )}
              </Form.Group>
            </Form>
          </Col>
          <div className="w-100" />
          <Col className="d-flex justify-content-end">
            <Button
              onClick={() =>
                validate() && generateGiftHandler({ amount, email })
              }>
              Generate
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </>
  );
}
