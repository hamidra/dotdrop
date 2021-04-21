import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useSubstrate } from '../../substrate-lib';
import Button from '../../components/CustomButton';
export default function ImportAccount({ setAccountHandler }) {
  const { keyring } = useSubstrate();
  const [accountSecret, setAccountSecret] = useState('');
  const importAccountFromSecret = async (accountSecret) => {
    // ToDO: verify mnemonic secret is valid
    // ToDO: add advanced option to load 'ed25519 and derived accounts
    const account = await keyring.createFromUri(accountSecret, null, 'sr25519');
    return account;
  };
  const _setAccountHandler = async () => {
    const account = await importAccountFromSecret(accountSecret);
    setAccountHandler(account);
  };
  return (
    <>
      <Row className="p-3 text-center">
        <Col>
          <h3>
            Please enter your 12 words mnemonic phrase to import your account!
          </h3>
        </Col>
      </Row>
      <Row className="justify-content-center align-items-center">
        <Col
          style={{ height: 200 }}
          className="d-flex flex-column justify-content-center align-items-center text-center">
          <textarea
            className="w-50 h-75"
            onChange={(e) => setAccountSecret(e.target.value)}
            value={accountSecret}
          />
        </Col>
        <div className="w-100" />
        <Col className="d-flex justify-content-end">
          <Button onClick={() => _setAccountHandler()}>Import</Button>
        </Col>
      </Row>
    </>
  );
}
