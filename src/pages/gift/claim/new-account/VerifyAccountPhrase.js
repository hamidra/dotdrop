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
    if (check1?.toLocaleLowerCase() !== mnemonicWords[1].toLocaleLowerCase()) {
      isValid = false;
      phraseErrors.check1 = 'Please enter the correct phrase';
    }
    if (check2?.toLowerCase() !== mnemonicWords[8]?.toLocaleLowerCase()) {
      isValid = false;
      phraseErrors.check2 = 'Please enter the correct phrase';
    }
    setErrors({ ...errors, ...phraseErrors });
    return isValid;
  };
  return (
    <Card.Body className="d-flex flex-column">
      <CardHeader
        title={'Verify Phrase'}
        cardText="Enter the following words from the seed phrase to complete the
        setup process."
        backClickHandler={() => prevStepHandler()}
      />
      <div>
        <Row className="pt-5 flex-column">
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
                    setCheck1(e.target.value?.toLowerCase());
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
                    setCheck2(e.target.value?.toLowerCase());
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
        </Row>
      </div>
      <div className="flex-grow-1" />
      <Col className="d-flex pt-4 justify-content-center align-items-center">
        <Button
          variant="outline-primary"
          onClick={() => validate() && nextStepHandler()}>
          Verify Phrase
        </Button>
      </Col>
    </Card.Body>
  );
}
