import { useContext } from 'react';
import { ClaimContext } from '../ClaimMain';
import { Card, Row, Col } from 'react-bootstrap';
import Button from '../../../../components/CustomButton';
import CardButton from '../../../../components/CardButton';
import CardHeader from '../../../../components/CardHeader';

const ConnectExistingAccount = () => {
  const { setAccountSourceHandler } = useContext(ClaimContext);

  return (
      <Card.Body>
          <CardHeader title="Connect Account" />
          <Row className="justify-content-center align-items-center">
            <Col className="d-flex flex-column justify-content-center align-items-center pt-4">
                <p className="text-center">
                <span className="d-block">
                    Connect an existing Polkadot account.
                </span>
                </p>
                <Button
                variant="outline-primary"
                onClick={() => setAccountSourceHandler('EXISTING')}>
                Enter Address Manually
                </Button>
            </Col>
            <Col>
                <CardButton
                logo='extension'
                onClick={() => setAccountSourceHandler('EXTENSION')}
                smallFont={true}
                >
                Load With Polkadot Extension
                </CardButton>
            </Col>
            <Col>
                <CardButton
                logo='signer'
                onClick={() => setAccountSourceHandler('SIGNER')}
                smallFont={true}
                >
                Scan from Parity Signer
                </CardButton>
            </Col>
          </Row>
      </Card.Body>
  );
};

export default ConnectExistingAccount;
