import { useContext } from 'react';
import { GenerateContext } from './GenerateMain';
import CardHeader from '../../../components/CardHeader';
import { Row, Col, Card } from 'react-bootstrap';
export default function HardwalletAccount() {
  const { prevStep } = useContext(GenerateContext);
  const title = 'Connecting Harware Wallet Account';
  return (
    <>
      <Card.Body>
        <CardHeader title={title} backClickHandler={() => prevStep()} />
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
