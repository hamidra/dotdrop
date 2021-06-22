import { Card, Row, Col } from 'react-bootstrap';
import CardHeader from '../../../components/CardHeader';
import Divider from '../../../components/Divider';

export default function ConnectAccount ({ setAccountSourceHandler }) {
  return (
    <>
      <Card.Body className="d-flex flex-column">
        <CardHeader
          title="Claim Your Gift"
          cardText="Create a new Polkadot account, or connect an existing account to transfer your gift to."
        />
        <Col className="d-flex flex-column  flex-grow-1 justify-content-center align-items-center">
          <Row className="d-flex flex-column justify-content-center align-items-center pt-2">
            <button
              className='btn btn-primary btn-lg'
              onClick={() => setAccountSourceHandler('NEW')}>
              Create Polkadot Account
            </button>
          </Row>
          <Divider text="Or" />
          <Row className="d-flex flex-column justify-content-center align-items-center">
            <button
              className="btn btn-link"
              onClick={() => setAccountSourceHandler('EXISTING')}>
              Connect Existing Account
            </button>
          </Row>
        </Col>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-center">
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
