import { Row, Col, Button, Card } from 'react-bootstrap';
import { useContext } from 'react';
import { GenerateContext } from './generate/GenerateMain';
import { Link } from 'react-router-dom';
export default function AccountOptions({ options }) {
  return (
    <>
      <Row>
        {options.map((option) => (
          <Col>
            <Card
              onClick={() => {
                option.selectHandler();
              }}>
              <Card.Body>{option.label}</Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}
