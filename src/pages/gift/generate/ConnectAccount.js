import { useContext } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import Button from '../../../components/CustomButton';
import CardButton from '../../../components/CardButton';
import { GenerateContext } from './GenerateMain';
import CardHeader from '../../../components/CardHeader';
export default function ConnectAccount () {
  const { nextStep, setAccountSource } = useContext(GenerateContext);

  const optionSelectHandler = (accountSource) => {
    setAccountSource(accountSource);
    nextStep();
  };

  return (
    <>
      <Card.Body>
        <CardHeader title="Connect Account" />
        <Row className="align-items-center flex-column justify-content-center text-center pt-5">
          <Col sm="6">
            <CardButton
              logo="extension"
              onClick={() => optionSelectHandler('EXTENSION')}>
              Polkadot Extension
            </CardButton>
          </Col>
        </Row>
        <Row className="pt-4">
          <Col xs="12">
            <hr />
          </Col>
        </Row>
        <Row className="align-items-center pt-4">
          <Col sm="6" className="mb-3">
            <CardButton
              logo="ledger"
              onClick={() => optionSelectHandler('HARDWALLET')}>
              Ledger
            </CardButton>
          </Col>
          <Col sm="6" className="mb-3">
            <CardButton
              logo="signer"
              onClick={() => optionSelectHandler('SIGNER')}>
              Parity Signer
            </CardButton>
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer>
        <span>
          By connecting an account, I accept the
          <a href="policy" target="_blank">
            terms and conditions
          </a>
          .
        </span>
      </Card.Footer>
    </>
  );
}
