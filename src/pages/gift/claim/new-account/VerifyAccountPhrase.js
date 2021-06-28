import { Card, Row, Col, Form } from 'react-bootstrap';
import CardHeader from '../../../../components/CardHeader';
import { useState } from 'react';

const randomIdx = (length) => {
  const random1 = Math.floor(Math.random() * length) + 1;
  let random2 = Math.floor(Math.random() * length) + 1;
  random2 = random2 === random1 ? ((random2 * 2) % length) + 1 : random2;
  return [random1, random2].sort((a, b) => a - b);
};

export default function VerifyAccountPhrase({
  mnemonicWords,
  nextStepHandler,
  prevStepHandler,
}) {
  const [check1, setCheck1] = useState('');
  const [check2, setCheck2] = useState('');
  const [errors, setErrors] = useState({ check1: '', check2: '' });

  const [randIdx, setRandIdx] = useState(randomIdx(mnemonicWords.length));

  const validate = () => {
    let isValid = true;
    const phraseErrors = {};
    if (check1?.toLowerCase() !== mnemonicWords[randIdx[0] - 1].toLowerCase()) {
      isValid = false;
      phraseErrors.check1 = 'Please enter the correct phrase';
    }
    if (
      check2?.toLowerCase() !== mnemonicWords[randIdx[1] - 1]?.toLowerCase()
    ) {
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
                <Form.Label>{`Word #${randIdx[0]}`}</Form.Label>
                <Form.Control
                  type="input"
                  placeholder={`Word #${randIdx[0]}`}
                  value={check1}
                  onChange={(e) => {
                    setErrors({ ...errors, check1: '' });
                    setCheck1(e?.target?.value?.trim().toLowerCase());
                  }}
                />
                {errors && errors.check1 && (
                  <Form.Text style={{ color: 'red' }}>
                    {errors.check1}
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group controlId="formGroupWord1">
                <Form.Label>{`Word #${randIdx[1]}`}</Form.Label>
                <Form.Control
                  type="input"
                  placeholder={`Word #${randIdx[1]}`}
                  value={check2}
                  onChange={(e) => {
                    setErrors({ ...errors, check2: '' });
                    setCheck2(e?.target?.value?.trim().toLowerCase());
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
        <button
          className="btn btn-primary"
          onClick={() => validate() && nextStepHandler()}>
          Verify Phrase
        </button>
      </Col>
    </Card.Body>
  );
}
