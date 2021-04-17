import { useContext } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { ClaimContext } from './ClaimMain';

export default function SelectAccount({ children }) {
  const { jumpToStep } = useContext(ClaimContext);
  return (
    <>
      <Row>
        <Col>
          <Button onClick={() => jumpToStep(0)}>Back</Button>
        </Col>
      </Row>
      <Row>
        <Col>{children}</Col>
      </Row>
    </>
  );
}
