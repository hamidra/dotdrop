import { useEffect, useState } from 'react';
import { Row, Col, Card, Spinner } from 'react-bootstrap';
import { useSubstrate, utils } from '../../../substrate-lib';
import { DownloadSimple } from 'phosphor-react';
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

const DownloadExtension = () => {
  const extensionLink = 'https://polkadot.js.org/extension/';
  return (
    <Row className="p-md-5 justify-content-center">
      <Col className="d-flex flex-column justify-content-center align-items-center text-center">
        <a
          style={{ height: '100px' }}
          className="d-flex flex-column justify-content-around align-items-center"
          href={extensionLink}>
          <DownloadSimple
            className="flex-shrink-0 p-2 rounded icon"
            size={68}
          />
          <div style={{ fontSize: '1.5rem' }} className="text-secondary">
            Download Polkadot Extension
          </div>
        </a>
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
  const accounts = keyring?.getPairs() || [];
  const accountsBalances = {};
  const balanceDecimalPoints = 4;
  balances &&
    accounts?.forEach(({ address }) => {
      if (address && balances[address]) {
        const usableBalance = utils.getUsableBalances(balances[address]);
        accountsBalances[address] = utils.fromChainUnit(
          usableBalance,
          chainInfo?.decimals,
          balanceDecimalPoints
        );
      }
    });
  useEffect(() => {
    loadExtension(state, dispatch, chainInfo);
  }, [dispatch, state]);
  const _setAccountHandler = () => {
    setAccountHandler && setAccountHandler(selectedAccount);
    setAddressHandler && setAddressHandler(selectedAccount?.address);
  };
  const cardMessage =
    extensionState === 'NOT_AVAILABLE'
      ? ''
      : extensionState === 'READY'
        ? `Select your ${giftTheme?.network} account below:`
        : '';
  const cardTitle =
    extensionState === 'NOT_AVAILABLE'
      ? 'Extension Not Detected'
      : extensionState === 'READY'
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
        {extensionState === 'NOT_AVAILABLE'
          ? (<DownloadExtension />)
          : extensionState === 'READY'
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
                  disabled={!selectedAccount}
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
