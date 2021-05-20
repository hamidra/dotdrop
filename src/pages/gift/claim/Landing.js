import { useContext } from 'react';
import { ClaimContext } from './ClaimMain';
import { Card, Row, Col } from 'react-bootstrap';
import Button from '../../../components/CustomButton';
import LinkButton from '../../../components/LinkButton';
import CardHeader from '../../../components/CardHeader';
import Divider from '../../../components/Divider';

export default function Landing ({ setAccountSourceHandler }) {
  return (
    <>
      <Card.Body>
        <CardHeader
          title="Dot Account"
          cardText='Create a new Polkadot account to transfer your gift to.'
        />
        <Row className="justify-content-center align-items-center">
          <Col className="d-flex flex-column justify-content-center align-items-center pt-2">
            <Button
              variant="outline-primary"
              onClick={() => setAccountSourceHandler('NEW')}>
              Create Polkadot Account
            </Button>
          </Col>
        </Row>
        <Divider text='Or'/>
        <Row className="align-items-center">
          <div className="w-100" />
          <Col className="d-flex flex-column justify-content-center align-items-center">
            <LinkButton
              variant="link"
              onClick={() => setAccountSourceHandler('EXISTING')}>
              Connect Existing Account
            </LinkButton>
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer>
        <span>
          By connecting an account, I accept the
          <a href="policy" target="_blank">
            &nbsp;terms and conditions
          </a>
          .
        </span>
      </Card.Footer>
    </>
  );
}
