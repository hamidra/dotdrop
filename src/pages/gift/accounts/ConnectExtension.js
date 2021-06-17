import { useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { useSubstrate, utils } from '../../../substrate-lib';
import AccountSelector from '../../../components/account/AccountSelector';
import CardHeader from '../../../components/CardHeader';

export default function ExtensionAccount({
  setAccountHandler,
  setAddressHandler,
  title,
  prevStepHandler,
}) {
  const { keyring, balances, chainInfo } = useSubstrate();
  const [selectedAccount, setSelectedAccount] = useState(null);
  const accounts = keyring.getPairs();
  const accountsBalances = {};
  const balanceDecimalPoints = 4;
  balances &&
    accounts?.forEach(({ address }) => {
      if (address && balances[address]) {
        accountsBalances[address] = utils.fromChainUnit(
          balances[address]?.free,
          chainInfo.decimals,
          balanceDecimalPoints
        );
      }
    });

  const _setAccountHandler = () => {
    setAccountHandler && setAccountHandler(selectedAccount);
    setAddressHandler && setAddressHandler(selectedAccount?.address);
  };
  return (
    <>
      <Card.Body className="d-flex flex-column">
        <CardHeader
          title={title || 'Select Account'}
          cardText={'Select your polkadot account below:'}
          backClickHandler={prevStepHandler}
        />
        <Row className="p-md-5 justify-content-center">
          <Col className="d-flex flex-column justify-content-center align-items-center text-center">
            <AccountSelector
              accounts={accounts}
              balances={accountsBalances}
              token={chainInfo?.token}
              selectedAccount={selectedAccount}
              setSelectedAccount={setSelectedAccount}
              maxStrlength={15}
            />
          </Col>
        </Row>
        <div className="d-flex flex-grow-1" />
        <Row>
          <Col className="pt-4 d-flex justify-content-center">
            <button
              className="btn btn-primary"
              onClick={() => _setAccountHandler()}>
              Connect
            </button>
          </Col>
        </Row>
      </Card.Body>
    </>
  );
}
