import { useContext, useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import AccountSelector from '../../../../components/AccountSelector';
import { GenerateContext } from '../GenerateMain';
import { useSubstrate } from '../../../../substrate-lib';

export default function ExtensionAccount() {
  const { prevStep, nextStep, setAccount } = useContext(GenerateContext);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const { keyring } = useSubstrate();
  const accounts = keyring.getPairs();
  const addHandler = () => {
    setAccount(selectedAccount);
    nextStep();
  };
  return (
    <>
      <Row>
        <Col>
          <Button onClick={() => prevStep()}>Back</Button>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <AccountSelector
          accounts={accounts}
          selectedAccount={selectedAccount}
          setSelectedAccount={setSelectedAccount}
        />
      </Row>
      <Row>
        <Button onClick={() => addHandler()}>Add</Button>
      </Row>
    </>
  );
}
