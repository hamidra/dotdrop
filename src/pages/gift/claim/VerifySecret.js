import { useContext, useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { ClaimContext } from './ClaimMain';
export default function VerifySecret({ claimGiftHandler }) {
  const { prevStep } = useContext(ClaimContext);
  const [redeemSecret, setRedeemSecret] = useState('');
  return (
    <>
      <Row className="p-4">
        <Col>
          <Button
            variant="outline-dark"
            className="shadow-sm"
            onClick={() => prevStep()}>
            Back
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          Enter the 12 words secret you have recieved to redeem your gift!
        </Col>
      </Row>
      <Row>
        <Col>
          <textarea
            className="w-100"
            onChange={(e) => setRedeemSecret(e.target.value)}
            value={redeemSecret}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Button onClick={() => claimGiftHandler(redeemSecret)}>Redeem</Button>
        </Col>
      </Row>
    </>
  );
}
