import { useEffect, useState } from 'react';
import { Card, Row, Col, Spinner, Media } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Header from '../Header';
import { useSubstrate, utils } from '../../../substrate-lib';
import { stringHelpers } from '../../../utils';
import holder64 from '../../../images/Rectangle64.png';
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
  return (
    <Media {...props}>
      <img width={64} height={64} className="mr-4" src={holder64} alt={title} />
      <Media.Body>
        <h5>{title}</h5>
        <p>{subtitle}</p>
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
      <Row className="p-5">
        <Col>
          <Card
            style={{ width: 450, maxWidth: '100%', minHeight: 450 }}
            className="shadow">
            <Card.Header className="bg-transparent border-0">
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
                    `${utils.toUnit(balance.free, chainInfo?.decimals)} DOTs`
                  }
                />
                <AccountField
                  title="Balance (Reserved)"
                  value={
                    balance?.reserved &&
                    `${utils.toUnit(
                      balance.reserved,
                      chainInfo?.decimals
                    )} DOTs`
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
            <h3>DOT Wallets</h3>
            <p>Import your account to one of the following wallets:</p>
          </div>
          <WalletInfoField
            className="mt-3"
            title="Polkadot Extension"
            subtitle="Easy-to-use browser wallet"
          />
          <WalletInfoField
            className="mt-3"
            title="Parity Signer"
            subtitle="Secure offline wallet"
          />
          <WalletInfoField
            className="mt-3"
            title="Hardware wallet"
            subtitle="Secure offline wallet"
          />
        </Col>
      </Row>
    </>
  );
}
