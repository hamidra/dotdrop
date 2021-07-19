import { useContext } from 'react';
import { GenerateContext } from './GenerateMain';
import { Card, Row, Col } from 'react-bootstrap';
import CardHeader from '../../../components/CardHeader';
import { useSubstrate } from '../../../substrate-lib';
export default function Landing () {
  const { nextStep } = useContext(GenerateContext);
  const { giftTheme } = useSubstrate();
  return (
    <>
      <Card.Body className="d-flex flex-column">
        <CardHeader
          title={`Gift ${giftTheme?.content}`}
          cardText={`Send  ${giftTheme?.content} to your friends and familiy, and have them join the
          ${giftTheme?.network} Network today.`}
        />
        <Row className="justify-content-center align-items-center">
          <Col className="d-flex flex-column justify-content-around align-items-center">
            <div className="pt-5">
              <button
                className="btn btn-primary btn-lg"
                onClick={() => nextStep()}>
                Send a New Gift
              </button>
            </div>
            <a
              className="pt-5 small text-underline"
              href="#/About"
              target="_blank">
              {'How do gifts work?'}
            </a>
          </Col>
        </Row>
      </Card.Body>
    </>
  );
}
