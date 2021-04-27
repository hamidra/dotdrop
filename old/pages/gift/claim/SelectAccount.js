import { useContext } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import Button from '../../../components/CustomButton';
import { ClaimContext } from './ClaimMain';

export default function SelectAccount({ children }) {
  const { jumpToStep } = useContext(ClaimContext);
  return (
    <>
      <Row className="p-4">
        <Col>
          <Button onClick={() => jumpToStep(0)}>{'< Back'}</Button>
        </Col>
      </Row>
      <Row className="justify-content-center align-items-center">
        <Col className="d-flex justify-content-center align-items-center">
          <Card style={{ width: 800, maxWidth: '100%' }} className="shadow">
            <Card.Body>{children}</Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
