import CardHeader from '../../../components/CardHeader';
import { Row, Col, Card } from 'react-bootstrap';
export default function HardwalletAccount({ prevStepHandler }) {
  const title = 'Connecting Harware Wallet Account';
  return (
    <>
      <Card.Body>
        <CardHeader title={title} backClickHandler={prevStepHandler} />
        <Row className="p-5 justify-content-center">
          <Col
            style={{ height: 200 }}
            className="d-flex flex-column justify-content-center align-items-center text-center">
            <div className="text-center">
              <h2>Coming soon!</h2>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </>
  );
}
