import { useContext } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { ClaimContext } from './ClaimMain';
export default function CreateNewAccount() {
  const { nextStep, prevStep } = useContext(ClaimContext);
  const label = 'I have stored my 12 words secret in a safe place.';
  return (
    <>
      <Row>
        <Col>
          <Button onClick={() => prevStep()}>Back</Button>
        </Col>
      </Row>
      <Row>
        <Col xs="12">
          <p>Your account is Ready!</p>
          <p>
            Before we deposit your gift to your new account let’s store your
            accont in a secure place be able to access your DOTs in future!
          </p>
        </Col>
      </Row>
      <Row>
        <Col>Secret-Table</Col>
      </Row>
      <Row>
        <Col>
          <Form.Check type="checkbox" label={label} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Button onClick={() => nextStep()}>Next</Button>
        </Col>
      </Row>
    </>
  );
}
