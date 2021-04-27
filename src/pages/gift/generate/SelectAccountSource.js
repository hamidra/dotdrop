import { useContext } from 'react';
import { Row, Col, Button, Card } from 'react-bootstrap';
import { GenerateContext } from './GenerateMain';

export default function SelectAccountSource() {
  const { nextStep, setAccountSource } = useContext(GenerateContext);

  const optionSelectHandler = (accountSource) => {
    setAccountSource(accountSource);
    nextStep();
  };

  const sourceOptions = [
    {
      selectHandler: () => optionSelectHandler('IMPORTED_ACCOUNT'),
      label: 'KeyStore or mnemonic phrase',
    },
    {
      selectHandler: () => optionSelectHandler('EXTENSION_ACCOUNT'),
      label: 'Polkadot extension',
    },
    {
      selectHandler: () => optionSelectHandler('HARDWALLET_ACCOUNT'),
      label: 'Hardware Wallet',
    },
    {
      selectHandler: () => optionSelectHandler('SIGNER_ACCOUNT'),
      label: 'Parity Signer',
    },
  ];
  return (
    <>
      <Card style={{ width: 800, maxWidth: '100%' }} className="shadow">
        <Card.Body>
          <Row className="align-iterms-center text-center">
            <Col>
              <h3>Connect Account</h3>
            </Col>
            <div className="w-100" />
            <Col>
              <Button variant="outline-primary">
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
              <Card className="rounded-lg">
                <Card.Body>Ledger</Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="rounded-lg">
                <Card.Body>Parity Signer</Card.Body>
              </Card>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer>
          By connecting an account, I accept the terms and conditions
        </Card.Footer>
      </Card>
    </>
  );
}
