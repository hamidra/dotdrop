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
    let isValid = true;
    const phraseErrors = {};
    if (check1 !== mnemonicWords[1]) {
      isValid = false;
      phraseErrors.check1 = 'Please enter the correct phrase';
    }
    if (check2 !== mnemonicWords[8]) {
      isValid = false;
      phraseErrors.check2 = 'Please enter the correct phrase';
    }
    setErrors({ ...errors, ...phraseErrors });
    return isValid;
  };
  return (
    <Card.Body>
      <CardHeader
        title={'Verify Phrase'}
        backClickHandler={() => prevStepHandler()}
      />
      <div>
        <Row className="justify-content-center pt-3 align-items-center">
          <Col>
            <p className="text-center">
              Enter the following words from the seed phrase to complete the
              setup process.
            </p>
          </Col>
        </Row>
        <Row className="justify-content-center pt-3 flex-column align-items-center">
          <Col>
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
                  <Form.Text style={{ color: 'red' }}>
                    {errors.check1}
                  </Form.Text>
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
                  <Form.Text style={{ color: 'red' }}>
                    {errors.check2}
                  </Form.Text>
                )}
              </Form.Group>
            </Form>
          </Col>
          <Col className="d-flex pt-4 justify-content-center align-items-center">
            <Button
              variant="outline-primary"
              onClick={() => validate() && nextStepHandler()}>
              Verify Phrase
            </Button>
          </Col>
        </Row>
      </div>
    </Card.Body>
  );
}
