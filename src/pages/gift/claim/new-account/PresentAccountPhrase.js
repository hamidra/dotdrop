import { useState } from 'react';
import { Row, Col, Form, Card } from 'react-bootstrap';
import CardHeader from '../../../../components/CardHeader';
import Button from '../../../../components/CustomButton';
import { BsFillEyeFill, BsFillEyeSlashFill, BsEye } from 'react-icons/bs';

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
  const revealSecret = () => {
    if (blurred) {
      setBlurred(false);
    }
  };
  const hideSecret = () => {
    if (!blurred) {
      setBlurred(true);
    }
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
          className="p-4 d-flex justify-content-center align-items-center flex-column"
          onClick={() => {
            revealSecret();
          }}>
          <div
            className={`mb-3 text-button text-center ${
              !blurred ? 'd-inline-block' : 'd-none'
            }`}
            onClick={() => hideSecret()}>
            <BsFillEyeSlashFill
              style={{
                flexShrink: '0',
                fontSize: '24px',
                marginBottom: 5,
                marginRight: 5,
              }}
            />
            <span>{'Hide secret words'}</span>
          </div>
          <Row
            style={{ fontSize: '1.25rem' }}
            className={`justify-content-center align-items-center ${
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
            className={`text-center overlay-center ${
              blurred ? 'd-block' : 'd-none'
            }`}>
            <BsFillEyeFill
              style={{ flexShrink: '0', fontSize: '24px', marginBottom: 5 }}
            />
            <p>{'Click here to reveal your secret words'}</p>
          </div>
        </div>
        <div className="d-flex flex-grow-1" />
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
        <div className="pt-4 d-flex justify-content-center">
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
