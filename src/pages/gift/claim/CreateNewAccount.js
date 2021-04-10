import { useContext, useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { ClaimContext } from './ClaimMain';
import { useSubstrate } from '../../../substrate-lib';
import { mnemonicGenerate } from '@polkadot/util-crypto';

export default function CreateNewAccount() {
  const { nextStep, prevStep, setAccount } = useContext(ClaimContext);
  const label = 'I have stored my 12 words secret in a safe place.';
  const { keyring } = useSubstrate();
  const createNewAccount = () => {
    const mnemonic = mnemonicGenerate();
    const account = keyring.createFromUri(mnemonic, null, 'ed25519');
    return { mnemonic, account };
  };
  const [newAccount, setNewAccount] = useState(createNewAccount());
  const nextClickHandler = () => {
    setAccount(newAccount.account);
    nextStep();
  };
  return (
    <>
      <Row>
        <Col>
          <Button onClick={() => prevStep()}>Back</Button>
        </Col>
      </Row>
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
          <Button onClick={nextClickHandler}>Next</Button>
        </Col>
      </Row>
    </>
  );
}
