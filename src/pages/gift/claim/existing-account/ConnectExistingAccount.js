import { useContext } from 'react';
import { ClaimContext } from '../ClaimMain';
import { Card, Row, Col } from 'react-bootstrap';
import Button from '../../../../components/CustomButton';
import CardButton from '../../../../components/CardButton';
import CardHeader from '../../../../components/CardHeader';

const ConnectExistingAccount = ({
  setExistingAccountSourceHandler,
  prevStepHandler,
}) => {
  return (
    <Card.Body>
      <CardHeader title="Connect Account" backClickHandler={prevStepHandler} />
      <Col className="justify-content-center align-items-center">
        <Col className="d-flex flex-column justify-content-center align-items-center pt-4">
          <p className="text-center">
            <span className="d-block">
              Connect an existing Polkadot account.
            </span>
          </p>
        </Col>
        <Row className='pt-4'>
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
        <div className="d-flex flex-row align-items-center py-5">
          <div className="d-flex flex-grow-1 border-top"></div>
          <div className="px-2">Or</div>
          <div className="d-flex flex-grow-1 border-top"></div>
        </div>
        <Row className='justify-content-center'>
          <LinkButton
            className='tertiary-button'
            onClick={() => setExistingAccountSourceHandler('ENTER')}>
            Enter Address Manually
          </LinkButton>
        </Row>
      </Col>
    </Card.Body>
  );
};

export default ConnectExistingAccount;
