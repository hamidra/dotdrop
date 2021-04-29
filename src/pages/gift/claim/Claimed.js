import { Row, Col, Card, Image } from 'react-bootstrap';
import Button from '../../../components/CustomButton';
import CardHeader from '../../../components/CardHeader';
import confetti from '../../../images/confetti.png';

export default function Claimed({ amount }) {
  return (
    <>
      <Card.Body>
        <CardHeader title={'Congratulations!'} />
        <Row className="justify-content-center align-items-center">
          <Col className="d-flex flex-column justify-content-center align-items-center">
            <Image style={{ width: 120 }} src={confetti} />
            <p className="text-center">
              Your Polkadot account has been funded and your gift of {amount}{' '}
              DOTs has been successfully transferred.
            </p>
            <p></p>
          </Col>
        </Row>
        <Row className="justify-content-center align-items-center">
          <Col className="d-flex flex-column justify-content-center align-items-center">
            <Button>See Account</Button>
          </Col>
        </Row>
      </Card.Body>
    </>
  );
}
