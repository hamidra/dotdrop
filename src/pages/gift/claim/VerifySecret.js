import { useContext } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { ClaimContext } from './ClaimMain';
export default function VerifySecret() {
  const { prevStep, nextStep } = useContext(ClaimContext);
  return (
    <>
      <Row>
        <Col>
          <Button onClick={() => prevStep()}>Back</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          Enter the 12 words secret you have recieved to redeem your gift!
        </Col>
      </Row>
      <Row>
        <Col>
          <textarea className="w-100"></textarea>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button onClick={() => nextStep()}>Redeem</Button>
        </Col>
      </Row>
    </>
  );
}
