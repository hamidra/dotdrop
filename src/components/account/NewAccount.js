import { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useSubstrate } from '../../substrate-lib';
import { mnemonicGenerate } from '@polkadot/util-crypto';

export default function NewAccount({ setAccountHandler }) {
  const label = 'I have stored my 12 words secret in a safe place.';
  const { keyring } = useSubstrate();
  const createNewAccount = () => {
    const mnemonic = mnemonicGenerate();
    const account = keyring.createFromUri(mnemonic, null, 'sr25519');
    return { mnemonic, account };
  };
  const [newAccount, setNewAccount] = useState(createNewAccount());
  const _setAccountHandler = async () => {
    setAccountHandler(newAccount.account);
  };

  return (
    <>
      <Row>
        <Col xs="12">
          <p>Your account is Ready!</p>
          <p>
            Before we deposit your gift to your new account let’s store your
            accont in a secure place be able to access your DOTs in future!
          </p>
        </Col>
      </Row>
      <Row>
        <Col>{newAccount.mnemonic}</Col>
      </Row>
      <Row>
        <Col>
          <Form.Check type="checkbox" label={label} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Button onClick={() => _setAccountHandler()}>Next</Button>
        </Col>
      </Row>
    </>
  );
}
