import { Card, Row, Col, Form } from 'react-bootstrap';
import CardHeader from '../../../../components/CardHeader';
import { useState } from 'react';
import { Formik } from 'formik';

const randomIdx = (length) => {
  const random1 = Math.floor(Math.random() * length) + 1;
  let random2 = Math.floor(Math.random() * length) + 1;
  random2 = random2 === random1 ? (random2 + 1) % (length + 1) : random2;
  if (random2 === 0) {
    random2 += 1;
  }
  return [random1, random2].sort((a, b) => a - b);
};

export default function VerifyAccountPhrase ({
  mnemonicWords,
  nextStepHandler,
  prevStepHandler
}) {
  const [randIdx, setRandIdx] = useState(randomIdx(mnemonicWords.length));

  const validate = ({ phrase1, phrase2 }) => {
    const errors = {};
    if (
      phrase1?.toLowerCase() !== mnemonicWords[randIdx[0] - 1].toLowerCase()
    ) {
      errors.phrase1 = 'Please enter the correct phrase';
    }
    if (
      phrase2?.toLowerCase() !== mnemonicWords[randIdx[1] - 1]?.toLowerCase()
    ) {
      errors.phrase2 = 'Please enter the correct phrase';
    }
    return errors;
  };
  return (
    <Card.Body className="d-flex flex-column">
      <CardHeader
        title={'Verify Seed Phrase'}
        cardText="Enter the following words from the seed phrase you saved in the previous step to complete the
        setup process."
        backClickHandler={() => prevStepHandler()}
      />
      <Formik
        initialValues={{
          phrase1: '',
          phrase2: ''
        }}
        validate={validate}
        onSubmit={(values, actions) => {
          nextStepHandler();
          actions.setSubmitting(false);
        }}
      >
        {(props) => (
          <>
            <div>
              <Row className="pt-4 flex-column">
                <Col>
                  <Form autoComplete="off" className="w-100">
                    <Form.Group>
                      <Form.Label>{`Word #${randIdx[0]}`}</Form.Label>
                      <Form.Control
                        id="phrase1"
                        name="phrase1"
                        type="input"
                        isInvalid={
                          props.touched.phrase1 && !!props.errors.phrase1
                        }
                        value={props.values.phrase1}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        placeholder={`Word #${randIdx[0]}`}
                      />
                      <Form.Text className="danger">
                        {props.touched?.phrase1 && !!props.errors?.phrase1
                          ? props.errors.phrase1
                          : ''}
                      </Form.Text>
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>{`Word #${randIdx[1]}`}</Form.Label>
                      <Form.Control
                        id="phrase2"
                        name="phrase2"
                        type="input"
                        isInvalid={
                          props.touched.phrase2 && !!props.errors.phrase2
                        }
                        value={props.values.phrase2}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        placeholder={`Word #${randIdx[1]}`}
                      />
                      <Form.Text className="danger">
                        {props.touched.phrase2 && !!props.errors.phrase2
                          ? props.errors.phrase2
                          : ''}
                      </Form.Text>
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
            </div>
            <div className="flex-grow-1" />
            <Col className="d-flex pt-4 justify-content-center align-items-center">
              <button
                className="btn btn-primary"
                disabled={
                  (props.touched.phrase1 && !!props.errors.phrase1) ||
                  (props.touched.phrase2 && !!props.errors.phrase2)
                }
                onClick={() => !props.isSubmitting && props.submitForm()}
              >
                Verify Phrase
              </button>
            </Col>
          </>
        )}
      </Formik>
    </Card.Body>
  );
}
