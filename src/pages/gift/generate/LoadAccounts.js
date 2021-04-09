import { Row, Col, Button, Card } from 'react-bootstrap';

export default function LoadAccount() {
  return (
    <>
      <Row>
        <Col>
          <Button>Back</Button>
        </Col>
      </Row>
      <Row>
        <Col>How would you like to access your account?</Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>KeyStore or mnemonic phrase</Card.Body>
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
