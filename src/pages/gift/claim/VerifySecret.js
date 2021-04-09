import { Row, Col, Button } from 'react-bootstrap';

export default function VerifySecret() {
  return (
    <>
      <Row>
        <Col>
          <Button>Back</Button>
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
          <Button>Redeem</Button>
        </Col>
      </Row>
    </>
  );
}
