import { useState } from 'react';
import { Row, Col, Form, Card } from 'react-bootstrap';
import CardHeader from '../../../../components/CardHeader';
import Button from '../../../../components/CustomButton';

export default function PresentAccountPhrase({
  mnemonicWords,
  nextStepHandler,
  prevStepHandler,
}) {
  const label = 'I have stored my seed phrase in a safe place.';
  const [checked, setChecked] = useState(false);
  const [checkedError, setCheckedError] = useState('');
  const checkedErrorMessage = 'Please confirm you have saved your account';
  return (
    <>
      <Card.Body className='d-flex flex-column'>
        <CardHeader
          title={'Account Seed Phrase'}
          backClickHandler={() => prevStepHandler()}
          cardText='Write down the following words in order and store them
          somewhere safe. This seed phrase allows you to recover your
          account and funds.'
        />
        <div>
          <div
            className='d-flex flex-row flex-wrap p-2 mb-4 mt-5 rounded'
            style={{ background: '#F9FAFB' }}
          >
            {mnemonicWords.map((word, index) => (
                <div className="text-center font-weight-bold mx-1" key={index}>{`${word}`}</div>
            ))}
          </div>
          <Row className="flex-column justify-content-center align-items-center">
            <Col>
              <Form.Check
                className='ml-2'
                type="checkbox"
                value={checked}
                label={label}
                isInvalid={!!checkedError}
                onChange={(e) => {
                  setCheckedError('');
                  setChecked(e.target.checked);
                }}
              />
              {checkedError && (
                <Form.Text className="text-danger">{checkedError}</Form.Text>
              )}
            </Col>
          </Row>
        </div>
        <div className='d-flex flex-grow-1' />
        <div className="pt-5 d-flex justify-content-center">
          <Button
            onClick={() =>
              checked
                ? nextStepHandler()
                : setCheckedError(checkedErrorMessage)
            }>
            Next
          </Button>
        </div>
      </Card.Body>
    </>
  );
}
