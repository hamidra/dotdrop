import { useState, useContext } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { useSubstrate } from '../../../substrate-lib';
import { GenerateContext } from './GenerateMain';
import AccountSelector from '../../../components/account/AccountSelector';

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
        <Row className="align-iterms-center text-center">
          <Col>
            <div onClick={() => prevStep()}>{'<-'}</div>
          </Col>
          <Col>
            <h3>Connecting Account ...</h3>
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
      </Card.Body>
    </>
  );
}
