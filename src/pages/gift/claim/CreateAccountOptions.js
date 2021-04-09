import { useContext, useState } from 'react';
import { Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ClaimContext } from './ClaimMain';
export default function CreateAccountOptions() {
  const { nextStep } = useContext(ClaimContext);
  return (
    <>
      <Row>
        <Col>
          <Link to="/">
            <Button>Back</Button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col>Let’s deposit your gift to your Polkadot Account</Col>
      </Row>
      <Row>
        <Col>
          <Card onClick={() => nextStep()}>
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
