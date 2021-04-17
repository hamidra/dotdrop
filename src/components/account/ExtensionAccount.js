import { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import AccountSelector from './AccountSelector';
import { useSubstrate } from '../../substrate-lib';

export default function ExtensionAccount({ setAccountHandler }) {
  const [selectedAccount, setSelectedAccount] = useState(null);
  const { keyring } = useSubstrate();
  const accounts = keyring.getPairs();
  const _setAccountHandler = () => {
    setAccountHandler(selectedAccount);
  };
  return (
    <>
      <Row className="justify-content-center">
        <Col className="w-100">
          <AccountSelector
            accounts={accounts}
            selectedAccount={selectedAccount}
            setSelectedAccount={setSelectedAccount}
          />
        </Col>
        <Col className="w-100">
          <Button onClick={() => _setAccountHandler()}>Add</Button>
        </Col>
      </Row>
    </>
  );
}
