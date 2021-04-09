import {
  Row,
  Col,
  Button,
  Dropdown,
  DropdownButton,
  Form,
  Card,
} from 'react-bootstrap';
export default function GenerateGift() {
  return (
    <>
      <Row>
        <Col>
          <Button>Back</Button>
        </Col>
        <Col>
          <DropdownButton id="dropdown-basic-button" title="Dropdown button">
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </DropdownButton>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Form>
                <Form.Group as={Row} controlId="formGroupEmail">
                  <Form.Label>Gift value</Form.Label>
                  <Form.Control type="number" placeholder="10" />
                </Form.Group>
                <Form.Group as={Row} controlId="formGroupEmail">
                  <Form.Label>To who</Form.Label>
                  <Form.Control type="text" placeholder="Bob" />
                </Form.Group>
                <Row>
                  <Button>Generate</Button>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
