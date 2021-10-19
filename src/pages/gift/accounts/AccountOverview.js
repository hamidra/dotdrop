import { useEffect, useState } from 'react';
import { Card, Row, Col, Spinner, Media, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import { useSubstrate, utils } from '../../../substrate-lib';
import { stringHelpers } from '../../../utils';
import extensionLogo from '../../../images/extension_logo_128.png';
import ledgerLogo from '../../../images/ledger_logo_128.png';
import signerLogo from '../../../images/signer_logo_128.png';
import { CaretRight } from 'phosphor-react';

const balanceDecimalPoints = 5;
const AccountField = ({ title, value }) => {
  return (
    <div className="mt-3 d-flex flex-column flex-sm-row justify-content-between align-items-sm-center">
      <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>{title}</div>
      <div class="text-secondary">
        {value || (
          <Spinner
            variant="primary"
            animation="border"
            role="status"
            size="sm"
          />
        )}
      </div>
    </div>
  );
};
const WalletInfoField = ({ title, subtitle, ...props }) => {
  let logo = '';
  let href = '';
  if (title === 'Polkadot Extension') {
    logo = extensionLogo;
    href = 'https://polkadot.js.org/extension/';
  } else if (title === 'Parity Signer') {
    logo = signerLogo;
    href = 'https://www.parity.io/technologies/signer/';
  } else if (title === 'Hardware Wallet') {
    logo = ledgerLogo;
    href = 'https://support.ledger.com/hc/en-us/articles/360016289919-Polkadot-DOT';
  }

  return (
    <a
      className="card-link d-flex flex-row w-100"
      href={href}
      target="blank"
      rel="noopener noreferrer"
    >
      <Media style={{ alignItems: 'center' }} {...props}>
        <img
          width={48}
          height={48}
          className="mr-3 rounded"
          src={logo}
          alt={title}
        />
        <Media.Body className="flex-shrink-0">
          <h5 style={{ marginBottom: '0.25rem' }}>{title}</h5>
          <div class="text-secondary">{subtitle}</div>
        </Media.Body>
      </Media>
      <div className="d-flex flex-grow-1" />
      <CaretRight className="caret flex-shrink-0" size={14} weight="bold" />
    </a>
  );
};
export default function AccountOverview () {
  const { api, apiState, chainInfo, giftTheme } = useSubstrate();
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
            `free balance is ${balance?.free} with ${balance?.miscFrozen} frozen and ${balance?.reserved} reserved and a nonce of ${nonce}`
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
      <Container>
        <Row className="p-3 py-sm-5">
          <Col className="d-flex justify-content-center">
            <Card
              style={{ width: 920, maxWidth: '100%', minHeight: 450 }}
              className="shadow mb-5 m-sm-0">
              <Card.Header
                className="bg-transparent border-0"
                style={{ padding: '2rem 2rem 0 2rem' }}>
                <h3 className="font-weight-bold text-center text-sm-left">
                  Account Details
                </h3>
              </Card.Header>
              <Card.Body>
                <Row className="pb-2">
                  <Col className="mx-2 mb-5 mb-md-0">
                    <AccountField
                      title="Account Address"
                      value={`${accountAddress &&
                        utils.validateAddress(
                          accountAddress,
                          chainInfo?.ss58Format
                        )
                        ? stringHelpers.truncateMiddle(accountAddress, 5)
                        : 'Not a valid Account'
                        }`}
                    />
                    <AccountField
                      title="Balance (transferrable)"
                      value={
                        balance?.free &&
                        `${utils.fromChainUnit(
                          utils.getUsableBalances(balance),
                          chainInfo?.decimals,
                          balanceDecimalPoints
                        )} ${chainInfo?.token}`
                      }
                    />
                    <AccountField
                      title="Balance (locked)"
                      value={
                        balance?.miscFrozen &&
                        `${utils.fromChainUnit(
                          balance?.miscFrozen,
                          chainInfo?.decimals,
                          balanceDecimalPoints
                        )} ${chainInfo?.token}`
                      }
                    />
                    <AccountField
                      title="Balance (Reserved)"
                      value={
                        balance?.reserved &&
                        `${utils.fromChainUnit(
                          balance.reserved,
                          chainInfo?.decimals,
                          balanceDecimalPoints
                        )} ${chainInfo?.token}`
                      }
                    />
                    <div className="mt-4">
                      <a href={`https://polkascan.io/polkadot/account/${accountAddress}`} target="_blank" rel="noreferrer">
                        {'→ See account on Polkascan'}
                      </a>
                    </div>
                  </Col>
                  <div
                    className="mx-2 d-none d-sm-flex"
                    style={giftTheme.network === 'Polkadot' ? { backgroundColor: '#D5DBE0', width: '1px' } : { backgroundColor: '#333', width: '1px' }}
                  />
                  <Col className="d-flex flex-column mx-2 align-items-start justify-content-center">
                    <div>
                      <h4>{giftTheme.content} Wallets</h4>
                      <p class="text-secondary">Import your account to one of the following wallets:</p>
                    </div>
                    <div className="w-100 py-2">
                      <WalletInfoField
                        title="Polkadot Extension"
                        subtitle="Easy-to-use browser wallet"
                      />
                    </div>
                    <div className="w-100 py-2">
                      <WalletInfoField
                        title="Parity Signer"
                        subtitle="Secure offline wallet"
                      />
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}
