import Button from '../../../components/CustomButton';
import { useContext } from 'react';
import { GenerateContext } from './GenerateMain';
import { Card, Row, Col } from 'react-bootstrap';
import CardHeader from '../../../components/CardHeader';
export default function Landing() {
  const { nextStep } = useContext(GenerateContext);
  return (
    <>
      <Card.Body>
        <CardHeader title={'Gift Some Dots'} />
        <Row className="justify-content-center align-items-center">
          <Col className="d-flex flex-column justify-content-center align-items-center">
            <p className="text-center">
              Send DOTs to your friends and familiy, and have them join the
              Polkadot Network today.
            </p>
            <div className="w-100" />
            <Button variant="outline-primary" onClick={() => nextStep()}>
              Send a New Gift
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </>
  );
}
