import { Row, Col, Card } from 'react-bootstrap';
import Button from '../../../components/CustomButton';
import { Link } from 'react-router-dom';

export default function Claimed() {
  return (
    <>
      <Row className="p-4">
        <Link to="/">
          <Button>Home</Button>
        </Link>
      </Row>
      <Row className="justify-content-center align-items-center">
        <Col className="d-flex justify-content-center align-items-center">
          <Card style={{ width: 800, maxWidth: '100%' }} className="shadow">
            <Card.Body>
              <Row className="justify-content-center align-items-center">
                <Col
                  md="8"
                  style={{ height: 400 }}
                  className="d-flex flex-column justify-content-center align-items-center">
                  <h1>Congradulations!!</h1>
                  <h3> 🎉🥳🎊 🎁</h3>
                  <p>
                    Your gift has been claimed and tranferred to the following
                    account!
                  </p>
                  <p></p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
