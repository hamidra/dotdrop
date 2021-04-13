import { Row, Card, Col } from 'react-bootstrap';
import { Link, Switch, Route, useRouteMatch } from 'react-router-dom';
export default function Greeting() {
  // rail manage seek lobster sad wrap symbol clever type math town cool
  // gift =>
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
