import { useState } from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import { useSubstrate } from '../../substrate-lib';
export default function ImportAccount({ setAccount }) {
  const { keyring } = useSubstrate();
  const [accountSecret, setAccountSecret] = useState('');
  const importAccountFromSecret = async (accountSecret) => {
    // ToDO: verify mnemonic secret is valid
    // ToDO: add advanced option to load 'ed25519 and derived accounts
    const account = await keyring.createFromUri(accountSecret, null, 'sr25519');
    return account;
  };
  const setAccountHandler = async () => {
    const account = await importAccountFromSecret(accountSecret);
    setAccount(account);
  };
  return (
    <>
      <Row>
        <Col>
          Enter the 12 words secret you have recieved to redeem your gift!
        </Col>
      </Row>
      <Row>
        <Col>
          <textarea
            className="w-100"
            onChange={(e) => setAccountSecret(e.target.value)}
            value={accountSecret}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Button onClick={() => setAccountHandler()}>Import</Button>
        </Col>
      </Row>
    </>
  );
}
