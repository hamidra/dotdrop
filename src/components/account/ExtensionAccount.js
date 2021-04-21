import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import AccountSelector from './AccountSelector';
import Button from '../CustomButton';
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
      <Row className="p-3 text-center">
        <Col>
          <h3>Select the account you want to use</h3>
        </Col>
      </Row>
      <Row className="p-5 justify-content-center">
        <Col
          style={{ height: 200 }}
          className="d-flex flex-column justify-content-center align-items-center text-center">
          <AccountSelector
            accounts={accounts}
            selectedAccount={selectedAccount}
            setSelectedAccount={setSelectedAccount}
          />
        </Col>
        <div className="w-100" />
        <Col className="d-flex justify-content-end">
          <Button onClick={() => _setAccountHandler()}>Add</Button>
        </Col>
      </Row>
    </>
  );
}
