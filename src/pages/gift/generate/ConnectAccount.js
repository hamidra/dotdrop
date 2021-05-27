import { useContext } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import Button from '../../../components/CustomButton';
import CardButton from '../../../components/CardButton';
import { GenerateContext } from './GenerateMain';
import CardHeader from '../../../components/CardHeader';
import Divider from '../../../components/Divider';
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
            <Button
              onClick={() => optionSelectHandler('EXTENSION')}>
              Connect to Polkadot Extension
            </Button>
          </Col>
        </Row>
        <Divider text='or connect to' />
        <Row className="align-items-center">
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
          By connecting an account, I accept the&nbsp;
          <a href="policy" target="_blank">
            terms and conditions
          </a>
          .
        </span>
      </Card.Footer>
    </>
  );
}
