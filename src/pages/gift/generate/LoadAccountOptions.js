import { Row, Col, Button, Card } from 'react-bootstrap';
import { useContext } from 'react';
import { GenerateContext } from './GenerateMain';
import { Link } from 'react-router-dom';
export default function LoadAccountOptions() {
  const { nextStep, setAccountSource } = useContext(GenerateContext);
  const optionClickHandler = (option) => {
    setAccountSource(option);
    nextStep();
  };

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
        <Col>How would you like to access your account?</Col>
      </Row>
      <Row>
        <Col>
          <Card
            onClick={() => {
              optionClickHandler('IMPORTED_ACCOUNT');
            }}>
            <Card.Body>KeyStore or mnemonic phrase</Card.Body>
          </Card>
        </Col>
        <Col>
          <Card
            onClick={() => {
              optionClickHandler('EXTENSION_ACCOUNT');
            }}>
            <Card.Body>Polkadot extension</Card.Body>
          </Card>
        </Col>
        <Col>
          <Card
            onClick={() => {
              optionClickHandler('HARDWALLET_ACCOUNT');
            }}>
            <Card.Body>Hardware Wallet</Card.Body>
          </Card>
        </Col>
        <Col>
          <Card
            onClick={() => {
              optionClickHandler('SIGNER_ACCOUNT');
            }}>
            <Card.Body>Parity Signer</Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
