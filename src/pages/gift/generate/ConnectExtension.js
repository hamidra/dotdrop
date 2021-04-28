import { useState, useContext } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import Button from '../../../components/CustomButton';
import { useSubstrate } from '../../../substrate-lib';
import { GenerateContext } from './GenerateMain';
import AccountSelector from '../../../components/account/AccountSelector';
import CardHeader from '../../../components/CardHeader';

export default function ExtensionAccount({ setAccountHandler }) {
  const { keyring } = useSubstrate();
  const [selectedAccount, setSelectedAccount] = useState(null);
  const { prevStep } = useContext(GenerateContext);
  const accounts = keyring.getPairs();
  const _setAccountHandler = () => {
    setAccountHandler(selectedAccount);
  };
  return (
    <>
      <Card.Body>
        <CardHeader
          title="Select Your Account"
          backClickHandler={() => prevStep()}
        />
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
      </Card.Body>
    </>
  );
}
