import { Card, Row, Col } from 'react-bootstrap';
import CardButton from '../../../../components/CardButton';
import CardHeader from '../../../../components/CardHeader';
import Divider from '../../../../components/Divider';
import { useSubstrate } from '../../../../substrate-lib';

const ConnectExistingAccount = ({
  setExistingAccountSourceHandler,
  prevStepHandler
}) => {
  const { giftTheme } = useSubstrate();
  return (
    <Card.Body className="d-flex flex-column">
      <CardHeader
        title="Connect Account"
        cardText={`Connect an existing ${giftTheme?.network} account.`}
        backClickHandler={prevStepHandler}
      />
      <Col className="d-flex flex-column  flex-grow-1 justify-content-center align-items-center">
        <Row className="w-100">
          <Col className="mb-3">
            <CardButton
              logo="extension"
              onClick={() => setExistingAccountSourceHandler('EXTENSION')}>
              Polkadot Extension
            </CardButton>
          </Col>
          <Col className="mb-3">
            <CardButton
              logo="signer"
              onClick={() => setExistingAccountSourceHandler('SIGNER')}>
              Parity Signer
            </CardButton>
          </Col>
        </Row>
        <Divider text="Or" />
        <Row className="justify-content-center pb-4">
          <button
            className="btn btn-link"
            onClick={() => setExistingAccountSourceHandler('ENTER')}>
            Enter Address Manually
          </button>
        </Row>
      </Col>
    </Card.Body>
  );
};

export default ConnectExistingAccount;
