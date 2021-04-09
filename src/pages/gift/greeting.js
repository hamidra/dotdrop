import { Row, Card, Col } from 'react-bootstrap';

export default function Greeting() {
  return (
    <>
      <Row>There are no gifts better than some DOTs!</Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>Claim</Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>Generate</Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
