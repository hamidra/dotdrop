import { useContext, useState } from 'react';
import { Row, Col, Form, Card } from 'react-bootstrap';
import Button from '../../../components/CustomButton';

import { GenerateContext } from './GenerateMain';
export default function GenerateGift({ account, generateGiftHandler }) {
  const { jumpToStep } = useContext(GenerateContext);
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');

  return (
    <>
      <Row className="p-4">
        <Col>
          <Button onClick={() => jumpToStep(0)}>{'< Back'}</Button>
        </Col>
        <Col>{account ? account.address : 'no account'}</Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Form>
                <Form.Group as={Row} controlId="formGroupEmail">
                  <Form.Label>Gift value</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="10"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </Form.Group>
                <Form.Group as={Row} controlId="formGroupEmail">
                  <Form.Label>To who</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Bob"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
                <Row>
                  <Button onClick={() => generateGiftHandler({ amount, name })}>
                    Generate
                  </Button>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
