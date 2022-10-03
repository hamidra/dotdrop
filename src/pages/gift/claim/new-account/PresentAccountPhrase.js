import { useState } from 'react';
import { Row, Col, Form, Card } from 'react-bootstrap';
import CardHeader from '../../../../components/CardHeader';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Copy, Eye, EyeSlash } from 'phosphor-react';
import { useSubstrate } from '../../../../substrate-lib';

export default function PresentAccountPhrase ({
  mnemonicWords,
  nextStepHandler,
  prevStepHandler
}) {
  const { giftTheme } = useSubstrate();
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
          title={'Save Your Seed Phrase'}
          backClickHandler={() => prevStepHandler()}
          cardText={[
            'Write down the following phrase ',
            <b>in order</b>,
            ` and store it in a safe place. Anyone with access to your seed phrase has access to your ${giftTheme.content} `,
            'so be sure to keep it safe and never share it with anyone.'
          ]}
        />
        <div
          style={{ position: 'relative' }}
          className="container d-flex justify-content-center align-items-center flex-column"
          onClick={() => {
            revealSecret();
          }}>
          <Row
            className={`seedphrase justify-content-center align-items-center ${blurred ? 'blurred' : ''
              }`}>
            {mnemonicWords.map((word, index) => (
              <Col md={4} key={index}>
                <div className="seedphrase-item d-flex flex-row">
                  <div className="seedphrase-item-nr text-secondary">
                    {`${index + 1}.`}
                  </div>
                  <div>{`${word}`}</div>
                </div>
              </Col>
            ))}
          </Row>
          <Row
            className="justify-content-start w-100 pt-2"
            style={{ marginLeft: '-40px' }}>
            <div
              className="phrase-toggle text-button p-2"
              style={!blurred ? { display: 'flex' } : { display: 'none' }}
              onClick={() => hideSecret()}>
              <EyeSlash className="mr-1" size="18" />
              <span>{'Hide secret words'}</span>
            </div>
            <div
              className={`phrase-toggle text-center p-2 ${blurred ? 'd-flex' : 'd-none'
                }`}>
              <Eye className="mr-1" size="18" />
              <p>{'Reveal seedphrase'}</p>
            </div>
            {/* <CopyToClipboard
              text={mnemonicWords.join(' ')}
              onCopy={(result) => {
                setCopied(result);
              }}>
              <div
                className="p-2 mr-2 copy"
                onClick={(e) => e.stopPropagation()}>
                <Copy className="mr-1" size={18} />
                <span className="copy">{copied ? 'Copied' : 'Copy'}</span>
              </div>
            </CopyToClipboard> */}
          </Row>
        </div>
        <div className="flex-row justify-content-start align-items-center px-2 pt-2">
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
          <Form.Text className="danger ml-0">{checkedError || ''}</Form.Text>
        </div>
        <div className="d-flex flex-grow-1" />
        <div className="position-relative pt-4 d-flex justify-content-center">
          <button
            className="btn btn-primary"
            disabled={!!checkedError || !checked}
            onClick={() =>
              checked ? nextStepHandler() : setCheckedError(checkedErrorMessage)
            }>
            Next
          </button>
          {!checked && (
            <button
              className="btn btn-primary btn-set-error"
              onClick={() => setCheckedError(checkedErrorMessage)}
            >
              Next
            </button>
          )}
        </div>
      </Card.Body>
    </>
  );
}
