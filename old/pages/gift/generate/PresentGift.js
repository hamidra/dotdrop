import { Row, Col, Card } from 'react-bootstrap';
import Button from '../../../components/CustomButton';
import { Link } from 'react-router-dom';
export default function PresentGift({ gift, removeGiftHandler }) {
  const { name, amount, secret } = gift;
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
              <Row className="p-3 text-center">
                <Col>
                  <h3>Let your firend know!</h3>
                </Col>
              </Row>
              <Row className="justify-content-center align-items-center">
                <Col className="m-5 d-flex flex-column align-items-center">
                  <Card className="w-75">
                    <Card.Body>
                      <p>
                        Hey {name}! <br />
                        I'm sending you {amount} dots as a gift! you can go here
                        and type in the following secret message to claim your
                        DOTs.
                      </p>
                      <p style={{ textAlign: 'center' }}>
                        <strong>{secret} </strong>
                      </p>
                      <p>
                        The website will walk you through to create your own
                        secure Polkadot account. <br />
                        Enjoy!
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
                <div className="w-100" />
                <Col className="px-5 d-flex justify-content-around">
                  <Button>Print</Button>
                  <Button>Email</Button>
                  <Button onClick={() => removeGiftHandler(secret)}>
                    Remove
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
