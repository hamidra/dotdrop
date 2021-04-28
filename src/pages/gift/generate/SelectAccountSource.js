import { useContext } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import Button from '../../../components/CustomButton';
import { GenerateContext } from './GenerateMain';

export default function SelectAccountSource() {
  const { nextStep, setAccountSource } = useContext(GenerateContext);

  const optionSelectHandler = (accountSource) => {
    setAccountSource(accountSource);
    nextStep();
  };

  return (
    <>
      <Card.Body>
        <Row className="align-iterms-center text-center">
          <Col>
            <h3>Connect Account</h3>
          </Col>
          <div className="w-100" />
          <Col>
            <Button
              variant="outline-primary"
              onClick={() => optionSelectHandler('EXTENSION')}>
              Load with Polkadot Extension
            </Button>
          </Col>
          <div className="w-100" />
          <Col xs="12">
            <hr />
          </Col>
        </Row>
        <Row className="align-iterms-center">
          <Col>
            <Card
              className="rounded-lg"
              onClick={() => optionSelectHandler('HARDWALLET')}>
              <Card.Body>Ledger</Card.Body>
            </Card>
          </Col>
          <Col>
            <Card
              className="rounded-lg"
              onClick={() => optionSelectHandler('SIGNER')}>
              <Card.Body>Parity Signer</Card.Body>
            </Card>
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer>
        By connecting an account, I accept the
        <a href="policy" target="_blank">
          terms and conditions
        </a>
      </Card.Footer>
    </>
  );
}
