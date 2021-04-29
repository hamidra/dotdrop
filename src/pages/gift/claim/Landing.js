// import Button from '../../../components/CustomButton';
import { useContext } from 'react';
import { ClaimContext } from './ClaimMain';
import { Card, Row, Col, Button } from 'react-bootstrap';
import CardHeader from '../../../components/CardHeader';
export default function Landing() {
  const { setAccountSourceHandler } = useContext(ClaimContext);
  return (
    <>
      <Card.Body>
        <CardHeader title={'Dot Account'} />
        <Row className="justify-content-center align-items-center">
          <Col className="d-flex flex-column justify-content-center align-items-center">
            <p className="text-center">
              <span className="d-block">
                Create a new Polkadot account to transfer your gift to.
              </span>
              <span className="d-block">Or add an existing account.</span>
            </p>
            <Button
              variant="outline-primary"
              onClick={() => setAccountSourceHandler('NEW')}>
              Create polkadot Account
            </Button>
            <div className="p-2">Or</div>
            <Button
              variant="link"
              onClick={() => setAccountSourceHandler('EXISTING')}>
              Add Existing Account
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </>
  );
}
