import { useContext } from 'react';
import { ClaimContext } from '../ClaimMain';
import { Card, Row, Col } from 'react-bootstrap';
import LinkButton from '../../../../components/LinkButton';
import CardButton from '../../../../components/CardButton';
import CardHeader from '../../../../components/CardHeader';
import Divider from '../../../../components/Divider';

const ConnectExistingAccount = ({
  setExistingAccountSourceHandler,
  prevStepHandler,
}) => {
  return (
    <Card.Body className='d-flex flex-column'>
      <CardHeader title="Connect Account" backClickHandler={prevStepHandler} />
      <Col className="align-items-center">
        <Col className="d-flex flex-column align-items-center pt-3">
          <p className="text-center text-card">
            <span className="d-block">
              Connect an existing Polkadot account.
            </span>
          </p>
        </Col>
      </Col>
      <div className='flex-grow-1 align-items-center'>
        <div>
          <Row>
            <Col>
              <CardButton
                logo="extension"
                onClick={() => setExistingAccountSourceHandler('EXTENSION')}>
                Polkadot Extension
              </CardButton>
            </Col>
            <Col>
              <CardButton
                logo="signer"
                onClick={() => setExistingAccountSourceHandler('SIGNER')}>
                Parity Signer
              </CardButton>
            </Col>
          </Row>
          <Divider text='Or' />
          <Row className='justify-content-center'>
            <LinkButton
              className='tertiary-button'
              onClick={() => setExistingAccountSourceHandler('ENTER')}>
              Enter Address Manually
            </LinkButton>
          </Row>
        </div>
      </div>
    </Card.Body>
  );
};

export default ConnectExistingAccount;
