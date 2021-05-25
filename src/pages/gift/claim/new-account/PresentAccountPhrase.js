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
  const [blurred, setBlurred] = useState(true);
  const [checked, setChecked] = useState(false);
  const [checkedError, setCheckedError] = useState('');
  const checkedErrorMessage = 'Please confirm you have saved your account';
  const toggleBlurred = () => {
    setBlurred(!blurred);
  };
  return (
    <>
      <Card.Body className="d-flex flex-column">
        <CardHeader
          title={'Account Seed Phrase'}
          backClickHandler={() => prevStepHandler()}
          cardText="Write down the following words in order and store them
          somewhere safe. This seed phrase allows you to recover your
          account and funds."
        />
        <div
          style={{ position: 'relative' }}
          onClick={() => {
            toggleBlurred();
          }}>
          <Row
            style={{ fontSize: '1.25rem' }}
            className={`p-5 justify-content-center align-items-center ${
              blurred ? 'blurred' : ''
            }`}>
            {mnemonicWords.map((word, index) => (
              <Col md={4} key={index}>
                <div className=" d-flex flex-row border-bottom border-primary">
                  <div className="text-secondary"> {`${index + 1}.`}</div>
                  <div className="text-center m-auto">{`${word}`}</div>
                </div>
              </Col>
            ))}
          </Row>
          <div
            style={{ fontSize: '2rem' }}
            className={`overlay-center ${blurred ? 'd-block' : 'd-none'}`}>
            {'Reveal'}
          </div>
        </div>

        <Row className="flex-column justify-content-center align-items-center">
          <Col className="ml-2">
            <Form.Check
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
        <div className="d-flex flex-grow-1" />
        <div className="pt-5 d-flex justify-content-center">
          <Button
            onClick={() =>
              checked ? nextStepHandler() : setCheckedError(checkedErrorMessage)
            }>
            Next
          </Button>
        </div>
      </Card.Body>
    </>
  );
}
