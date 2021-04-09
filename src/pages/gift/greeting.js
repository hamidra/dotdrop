import { Row, Card, Col } from 'react-bootstrap';
import { Link, Switch, Route, useRouteMatch } from 'react-router-dom';
import CreateAccount from './claim/CreateAccountOptions';
import LoadAccount from './generate/LoadAccounts';
export default function Greeting() {
  return (
    <>
      <Row>There are no gifts better than some DOTs!</Row>
      <Row>
        <Col>
          <Link to="/claim">
            <Card>
              <Card.Body>Claim</Card.Body>
            </Card>
          </Link>
        </Col>

        <Col>
          <Link to="/generate">
            <Card>
              <Card.Body>Generate</Card.Body>
            </Card>
          </Link>
        </Col>
      </Row>
    </>
  );
}
