import { Row, Col, Button, Card } from 'react-bootstrap';
export default function PresentGift() {
  return (
    <>
      <Row>
        <Button>Home</Button>
      </Row>
      <Row>
        <Col>Let your firend know!</Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              Hey ! I'm sending you dots as a gift! you can go here and type in
              the following secret message to claim your DOTs. home garbage
              weapon pass size intact pluck celery robot motion lonely grunt The
              website will walk you through to create your own secure Polkadot
              account Enjoy!
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button>Print</Button>
        </Col>
        <Col>
          <Button>Email</Button>
        </Col>
        <Col>
          <Button>Remove</Button>
        </Col>
      </Row>
    </>
  );
}
