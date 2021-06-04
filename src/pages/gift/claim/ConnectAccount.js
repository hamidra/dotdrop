import { Card, Row, Col } from 'react-bootstrap';
import Button from '../../../components/CustomButton';
import LinkButton from '../../../components/LinkButton';
import CardHeader from '../../../components/CardHeader';
import Divider from '../../../components/Divider';

export default function ConnectAccount ({ setAccountSourceHandler }) {
  return (
    <>
      <Card.Body className="d-flex flex-column">
        <CardHeader
          title="DOT Account"
          cardText="Create a new Polkadot account to transfer your gift to."
        />
        <Col className="d-flex flex-column  flex-grow-1 justify-content-center align-items-center">
          <Row className="d-flex flex-column justify-content-center align-items-center pt-2">
            <Button
              variant="outline-primary"
              onClick={() => setAccountSourceHandler('NEW')}>
              Create Polkadot Account
            </Button>
          </Row>
          <Divider text="Or" />
          <Row className="d-flex flex-column justify-content-center align-items-center">
            <LinkButton
              variant="link"
              onClick={() => setAccountSourceHandler('EXISTING')}>
              Connect Existing Account
            </LinkButton>
          </Row>
        </Col>
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
