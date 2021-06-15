import { useState } from 'react';
import { Row, Col, Form, Card } from 'react-bootstrap';
import CardHeader from '../../../../components/CardHeader';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Copy, Eye, EyeSlash } from 'phosphor-react';

export default function PresentAccountPhrase ({
  mnemonicWords,
  nextStepHandler,
  prevStepHandler
}) {
  const label = 'I have stored my seed phrase in a safe place.';
  const [blurred, setBlurred] = useState(true);
  const [checked, setChecked] = useState(false);
  const [copied, setCopied] = useState(false);
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
          className="container d-flex justify-content-center align-items-center flex-column"
          onClick={() => {
            revealSecret();
          }}>
          {/* <Row className="align-self-end">
            <Col className={`text-button ${copied ? 'color-danger' : ''}`}>
              <CopyToClipboard
                text={mnemonicWords.join(' ')}
                onCopy={(result) => {
                  setCopied(result);
                }}>
                <div onClick={(e) => e.stopPropagation()}>
                  <FaCopy
                    style={{
                      flexShrink: '0',
                      fontSize: '24px'
                    }}
                  />
                  <span>{copied ? ' copied!' : ''}</span>
                </div>
              </CopyToClipboard>
            </Col>
          </Row> */}
          <Row
            className={`seedphrase justify-content-center align-items-center ${
              blurred ? 'blurred' : ''
            }`}>
            {mnemonicWords.map((word, index) => (
              <Col md={4} key={index}>
                <div className="seedphrase-item d-flex flex-row">
                  <div className="seedphrase-item-nr text-secondary"> {`${index + 1}.`}</div>
                  <div>{`${word}`}</div>
                </div>
              </Col>
            ))}
          </Row>
          <Row className="justify-content-start w-100 pt-2">
            <div
              className="phrase-toggle text-button p-2"
              style={!blurred ? { display: 'flex' } : { display: 'none' }}
              onClick={() => hideSecret()}>
              <EyeSlash
                className="mr-1"
                size="18"
              />
              <span>{'Hide secret words'}</span>
            </div>
            <div
              className={`phrase-toggle text-center overlay-center p-2 ${
                blurred ? 'd-flex' : 'd-none'
              }`}>
              <Eye
                className="mr-1"
                size="18"
              />
              <p>{'Reveal seedphrase'}</p>
            </div>
            <CopyToClipboard
                  text={mnemonicWords.join(' ')}
                  onCopy={(result) => {
                    setCopied(result);
                  }}>
                  <div className="p-2 mr-2 copy" onClick={(e) => e.stopPropagation()}>
                  <Copy className='mr-1' size={18} />
                    <span className='copy'>{copied ? 'Copied' : 'Copy'}</span>
                  </div>
              </CopyToClipboard>
          </Row>
        </div>
        <Row className="flex-column justify-content-center align-items-center pt-2">
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
          <button
            className='btn btn-primary'
            onClick={() =>
              checked ? nextStepHandler() : setCheckedError(checkedErrorMessage)
            }>
            Next
          </button>
        </div>
      </Card.Body>
    </>
  );
}
