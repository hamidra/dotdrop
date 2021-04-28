import { Row, Col, Card } from 'react-bootstrap';
import Button from '../../../components/CustomButton';
import CardHeader from '../../../components/CardHeader';
import { Link } from 'react-router-dom';
export default function PresentGift({ gift, removeGiftHandler }) {
  const { name, amount, secret } = gift;
  return (
    <>
      <Card.Body>
        <CardHeader title={'Add Message'} />
        <Row className="justify-content-center align-items-center">
          <Col className="d-flex flex-column justify-content-center align-items-center">
            <p className="text-center">
              Send DOTs to your friends and familiy, and have them join the
              Polkadot Network today.
            </p>
            <Row className="justify-content-center align-items-center">
              <Col className="m-5 d-flex flex-column align-items-center">
                <Card className="w-100">
                  <Card.Body>
                    <p>
                      Hey! <br />
                      I'm sending you {amount} dots as a gift! you can go follow
                      this link and type in the following secret message to
                      claim your DOTs.
                      <strong
                        style={{
                          backgroundColor: '#EDF1F5',
                          display: 'block',
                          textAlign: 'center',
                          padding: '5px',
                          marginTop: '20px',
                          marginBottom: '20px',
                          borderRadius: '5px',
                        }}>
                        {secret}{' '}
                      </strong>
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
          </Col>
        </Row>
      </Card.Body>
    </>
  );
}
