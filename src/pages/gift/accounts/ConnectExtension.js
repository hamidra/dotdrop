import { useEffect, useState } from 'react';
import { Row, Col, Card, Spinner } from 'react-bootstrap';
import { useSubstrate, utils } from '../../../substrate-lib';
import AccountSelector from '../../../components/account/AccountSelector';
import CardHeader from '../../../components/CardHeader';
import { loadExtension } from '../../../substrate-lib/extension';

const Connecting = () => {
  return (
    <Row className="p-md-5 justify-content-center">
      <Col className="d-flex flex-column justify-content-center align-items-center text-center">
        <div
          style={{ height: '100px' }}
          className="d-flex flex-column justify-content-around align-items-center">
          <div>
            <Spinner animation="border" role="status">
              <span className="sr-only">Processing...</span>
            </Spinner>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default function ExtensionAccount ({
  setAccountHandler,
  setAddressHandler,
  title,
  prevStepHandler
}) {
  const { dispatch, ...state } = useSubstrate();
  const { keyring, balances, chainInfo, giftTheme, extensionState } = state;
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
  useEffect(() => {
    loadExtension(state, dispatch);
  }, [dispatch, state]);
  const _setAccountHandler = () => {
    setAccountHandler && setAccountHandler(selectedAccount);
    setAddressHandler && setAddressHandler(selectedAccount?.address);
  };
  const cardMessage =
    extensionState === 'READY'
      ? `Select your ${giftTheme?.network} account below:`
      : '';
  const cardTitle =
    extensionState === 'READY'
      ? title || 'Select Account'
      : 'Connecting To Polkadot Extension';
  return (
    <>
      <Card.Body className="d-flex flex-column">
        <CardHeader
          title={cardTitle}
          cardText={cardMessage}
          backClickHandler={prevStepHandler}
        />
        {extensionState === 'READY'
          ? (
          <>
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
          </>
            )
          : (
          <Connecting />
            )}
      </Card.Body>
    </>
  );
}
