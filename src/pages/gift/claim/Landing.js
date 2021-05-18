// import Button from '../../../components/CustomButton';
import { useContext } from 'react';
import { ClaimContext } from './ClaimMain';
import { Card, Row, Col } from 'react-bootstrap';
import Button from '../../../components/CustomButton';
import CardHeader from '../../../components/CardHeader';
export default function Landing () {
  const { nextStep, setAccountSourceHandler } = useContext(ClaimContext);
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
        <div className='d-flex flex-row align-items-center py-5'>
            <div className='d-flex flex-grow-1 border-top'></div>
            <div className='px-3'>Or</div>
            <div className='d-flex flex-grow-1 border-top'></div>
        </div>
        <Row className="align-items-center">
          <div className="w-100" />
          <Col className="d-flex flex-column justify-content-center align-items-center">
            <Button
              variant="link"
              onClick={() => nextStep()}>
              Connect Existing Account
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
