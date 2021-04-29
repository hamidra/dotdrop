import { Card, Row, Col, Form } from 'react-bootstrap';
import Button from '../../../../components/CustomButton';
import CardHeader from '../../../../components/CardHeader';
import { useState } from 'react';
export default function VerifyAccountPhrase({
  mnemonicWords,
  nextStepHandler,
  prevStepHandler,
}) {
  const [check1, setCheck1] = useState('');
  const [check2, setCheck2] = useState('');
  const [errors, setErrors] = useState({ check1: '', check2: '' });
  const validate = () => {
    return true;
  };
  return (
    <Card.Body>
      <CardHeader
        title={'Verify Phrase'}
        backClickHandler={() => prevStepHandler()}
      />
      <Row className="justify-content-center align-items-center">
        <Col className="d-flex flex-column justify-content-center align-items-center">
          <p className="text-center">
            <span className="d-block">
              Enter the following words from the seed phrase to complete the
              setup process.
            </span>
          </p>
          <div className="w-100" />
          <Form autoComplete="off" className="w-100">
            <Form.Group controlId="formGroupWord1">
              <Form.Label>Word #2</Form.Label>
              <Form.Control
                type="input"
                placeholder="Word #2"
                value={check1}
                onChange={(e) => {
                  setErrors({ ...errors, check1: '' });
                  setCheck1(e.target.value);
                }}
              />
              {errors && errors.check1 && (
                <Form.Text style={{ color: 'red' }}>{errors.check1}</Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId="formGroupWord1">
              <Form.Label>Word #9</Form.Label>
              <Form.Control
                type="input"
                placeholder="Word #9"
                value={check2}
                onChange={(e) => {
                  setErrors({ ...errors, check2: '' });
                  setCheck2(e.target.value);
                }}
              />
              {errors && errors.check2 && (
                <Form.Text style={{ color: 'red' }}>{errors.check2}</Form.Text>
              )}
            </Form.Group>
          </Form>
          <Button
            variant="outline-primary"
            onClick={() => validate() && nextStepHandler()}>
            Verify Phrase
          </Button>
        </Col>
      </Row>
    </Card.Body>
  );
}
