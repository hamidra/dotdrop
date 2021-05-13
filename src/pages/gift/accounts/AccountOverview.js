import { useEffect, useState } from 'react';
import { Card, Row, Col, Spinner, Media } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Header from '../Header';
import { useSubstrate, utils } from '../../../substrate-lib';
import { stringHelpers } from '../../../utils';
import extensionLogo from '../../../images/extension_logo_128.png';
import ledgerLogo from '../../../images/ledger_logo_128.png';
import signerLogo from '../../../images/signer_logo_128.png';

const AccountField = ({ title, value }) => {
  return (
    <Col className="mt-3 d-flex justify-content-between align-items-center">
      <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{title}</div>
      <div>
        {value || (
          <Spinner
            variant="primary"
            animation="border"
            role="status"
            size="sm"
          />
        )}
      </div>
    </Col>
  );
};
const WalletInfoField = ({ title, subtitle, ...props }) => {
  let logo = '';
  if (title === 'Polkadot Extension') {
    logo = extensionLogo;
  } else if (title === 'Parity Signer') {
    logo = signerLogo;
  } else if (title === 'Hardware Wallet') {
    logo = ledgerLogo;
  }

  return (
    <Media className='d-flex' style={{ alignItems: 'center' }} {...props}>
      <img width={64} height={64} className="mr-3 rounded" src={logo} alt={title} />
      <Media.Body>
        <h5 style={{ marginBottom: '0.25rem' }}>{title}</h5>
        <div>{subtitle}</div>
      </Media.Body>
    </Media>
  );
};
export default function AccountOverview() {
  const { api, apiState, chainInfo } = useSubstrate();
  const [balance, setBalance] = useState(null);

  const { accountAddress } = useParams();
  useEffect(() => {
    let unsub;
    setBalance(null);
    accountAddress &&
      utils.validateAddress(accountAddress, chainInfo?.ss58Format) &&
      api?.query?.system &&
      api.query.system
        .account(accountAddress, ({ nonce, data: balance }) => {
          setBalance(balance);
          console.log(
            `free balance is ${balance.free} with ${balance.reserved} reserved and a nonce of ${nonce}`
          );
        })
        .then((result) => {
          unsub = result;
        })
        .catch((error) => {
          console.log(error);
        });

    return () => unsub && unsub();
  }, [api, apiState, accountAddress, chainInfo]);
  return (
    <>
      <Header />
      <Row className="p-5 my-5">
        <Col className="d-flex justify-content-end px-5">
          <Card
            style={{ width: 450, maxWidth: '100%', minHeight: 450 }}
            className="shadow">
            <Card.Header
              className="bg-transparent border-0"
              style={{ padding: '2rem 2rem 0 2rem' }}
            >
              <h3 className="font-weight-bold">Account Details</h3>
            </Card.Header>
            <Card.Body>
              <Row className="flex-column">
                <AccountField
                  title="Account Address"
                  value={`${
                    accountAddress &&
                    utils.validateAddress(accountAddress, chainInfo?.ss58Format)
                      ? stringHelpers.truncateMiddle(accountAddress, 5)
                      : 'Not a valid Account'
                  }`}
                />
                <AccountField
                  title="Balance (Free)"
                  value={
                    balance?.free &&
                    `${utils.fromChainUnit(
                      balance.free,
                      chainInfo?.decimals
                    )} ${chainInfo?.token}`
                  }
                />
                <AccountField
                  title="Balance (Reserved)"
                  value={
                    balance?.reserved &&
                    `${utils.fromChainUnit(
                      balance.reserved,
                      chainInfo?.decimals
                    )} ${chainInfo?.token}`
                  }
                />
              </Row>
            </Card.Body>
            <Card.Footer className="bg-transparent border-0">
              <a href="https://polkascan.io/polkadot" target="_blank">
                {'→ See account on Polkascan'}
              </a>
            </Card.Footer>
          </Card>
        </Col>
        <Col className="d-flex flex-column align-items-start justify-content-center">
          <div>
            <h4>DOT Wallets</h4>
            <p>Import your account to one of the following wallets:</p>
          </div>
          <WalletInfoField
            className="mt-4"
            title="Polkadot Extension"
            subtitle="Easy-to-use browser wallet"
          />
          <WalletInfoField
            className="mt-4"
            title="Parity Signer"
            subtitle="Secure offline wallet"
          />
          <WalletInfoField
            className="mt-4"
            title="Hardware Wallet"
            subtitle="Secure offline wallet"
          />
        </Col>
      </Row>
    </>
  );
}
