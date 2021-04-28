import { useContext, useState } from 'react';
import { Row, Col, Form, Card } from 'react-bootstrap';
import Button from '../../../components/CustomButton';

import { GenerateContext } from './GenerateMain';
export default function GenerateGift({ account, generateGiftHandler }) {
  const { jumpToStep } = useContext(GenerateContext);
  const [amount, setAmount] = useState('');
  const [amountError, setAmountError] = useState('');
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');

  const validate = () => {
    let error = false;
    if (!name) {
      error = true;
      setNameError('Please enter a valid name');
    }
    if (!amount) {
      error = true;
      setAmountError('Please enter the gift value');
    }
    return !error;
  };
  return (
    <>
      <Row className="p-4 justify-content-between">
        <Col>
          <Button onClick={() => jumpToStep(0)}>{'< Back'}</Button>
        </Col>
        <Col>Gift Dots</Col>
      </Row>
      <Row className="justify-content-center align-items-center">
        <Col className="d-flex justify-content-center align-items-center">
          <Card style={{ width: 600, maxWidth: '100%' }} className="shadow">
            <Card.Body>
              <Row className="p-3 text-center">
                <Col>
                  <h3>Generate a gift</h3>
                </Col>
              </Row>
              <Row className="justify-content-center align-items-center">
                <Col
                  style={{ height: 200 }}
                  className="d-flex flex-column justify-content-center align-items-center">
                  <Form>
                    <Form.Group as={Row} controlId="formGroupEmail">
                      <Form.Label>Gift value</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="10"
                        value={amount}
                        onChange={(e) => {
                          setAmountError('');
                          setAmount(e.target.value);
                        }}
                      />
                    </Form.Group>
                    {amountError && (
                      <Form.Label style={{ color: 'red' }}>
                        <em>!{amountError}</em>
                      </Form.Label>
                    )}
                    <Form.Group as={Row} controlId="formGroupEmail">
                      <Form.Label>To who</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Bob"
                        value={name}
                        onChange={(e) => {
                          setNameError('');
                          setName(e.target.value);
                        }}
                      />
                    </Form.Group>
                    {nameError && (
                      <Form.Label style={{ color: 'red' }}>
                        <em>!{nameError}</em>
                      </Form.Label>
                    )}
                  </Form>
                </Col>
                <div className="w-100" />
                <Col className="d-flex justify-content-end">
                  <Button
                    onClick={() =>
                      validate() && generateGiftHandler({ amount, name })
                    }>
                    Generate
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
