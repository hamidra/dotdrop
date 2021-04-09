import { Row, Col, Button, Card } from 'react-bootstrap';

export default function CreateAccount() {
  return (
    <>
      <Row>
        <Col>
          <Button>Back</Button>
        </Col>
      </Row>
      <Row>
        <Col>Let’s deposit your gift to your Polkadot Account</Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>Create new Account</Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>Polkadot extension</Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>Hardware Wallet</Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>Parity Signer</Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
