// import Button from '../../../components/CustomButton';
import { useContext } from 'react';
import { ClaimContext } from './ClaimMain';
import { Card, Row, Col } from 'react-bootstrap';
import Button from '../../../components/CustomButton';
import CardButton from '../../../components/CardButton';
import CardHeader from '../../../components/CardHeader';
export default function Landing () {
  const { setAccountSourceHandler } = useContext(ClaimContext);
  return (
    <>
      <Card.Body>
        <CardHeader title="Dot Account" />
        <Row className="justify-content-center align-items-center">
          <Col className="d-flex flex-column justify-content-center align-items-center pt-4">
            <p className="text-center">
              <span className="d-block">
                Create a new Polkadot account to transfer your gift to.
              </span>
            </p>
            <Button
              variant="outline-primary"
              onClick={() => setAccountSourceHandler('NEW')}>
              Create Polkadot Account
            </Button>
          </Col>
        </Row>
        <Row className="pt-4">
          <Col xs="12">
            <hr />
          </Col>
        </Row>
        <Row className="align-items-center pt-4">
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
          <div className="w-100" />
          <Col className="d-flex flex-column justify-content-center align-items-center">
            <div className="p-2">Or</div>
            <Button
              variant="link"
              onClick={() => setAccountSourceHandler('EXISTING')}>
              Enter Address Manually
            </Button>
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer>
        <span>By connecting an account, I accept the
          <a href="policy" target="_blank">
            &nbsp;terms and conditions
          </a>
          .
        </span>
      </Card.Footer>
    </>
  );
}
