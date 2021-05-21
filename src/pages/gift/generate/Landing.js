import Button from '../../../components/CustomButton';
import { useContext } from 'react';
import { GenerateContext } from './GenerateMain';
import { Card, Row, Col } from 'react-bootstrap';
import CardHeader from '../../../components/CardHeader';
export default function Landing() {
  const { nextStep } = useContext(GenerateContext);
  return (
    <>
      <Card.Body className='d-flex flex-column'>
        <CardHeader
          title={'Gift Some Dots'}
          cardText='Send DOTs to your friends and familiy, and have them join the
          Polkadot Network today.'
        />
        <Col className="d-flex flex-column justify-content-around align-items-center">
            <div className='flex-grow-1'/>
            <Button variant="outline-primary" onClick={() => nextStep()}>
              Send a New Gift
            </Button>
        </Col>
      </Card.Body>
    </>
  );
}
