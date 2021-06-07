import { QrScanAddress } from '@polkadot/react-qr';
import { useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { useSubstrate } from '../../../substrate-lib';
import CardHeader from '../../../components/CardHeader';

export default function SignerAccount ({
  setAccountHandler,
  setAddressHandler,
  prevStepHandler
}) {
  // signer format
  // substrate:13Q6RcqeAjvUCrYhdKdeqzUpHMJRishtxLByQn9YkyvMsYKa:0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3:test
  const { keyring } = useSubstrate();
  const [showReader, setShowReader] = useState('true');
  const [externalAccount, setExternalAccount] = useState(null);
  const onScanHandler = (scannedAccount) => {
    if (scannedAccount.isAddress) {
      const account = keyring.keyring.addFromAddress(
        scannedAccount.content,
        {
          genesisHash: scannedAccount.genesisHash,
          name: scannedAccount.name,
          isExternal: true
        },
        null
      );
      setExternalAccount(account);
      setShowReader(false);
    }
  };

  const onCancelHandler = () => {
    setExternalAccount(null);
    setShowReader(true);
  };

  const _setAccountHandler = () => {
    // ToDO: validate account is not empty
    setAccountHandler && setAccountHandler(externalAccount);
    setAddressHandler && setAddressHandler(externalAccount.address);
  };

  return (
    <>
      <Card.Body>
        <CardHeader
          title='Scan QR Code'
          cardText='Scan your account QRCode from your Signer app.'
          backClickHandler={() => prevStepHandler()}
        />
        <Row className="justify-content-center align-items-center">
          {showReader
            ? (
            <Col className="d-flex justify-content-center">
              <div style={{ width: 400, height: 400 }}>
                <QrScanAddress onScan={(scanned) => onScanHandler(scanned)} />
              </div>
            </Col>
              )
            : (
            <>
              <Col
                style={{ height: 300 }}
                className="d-flex flex-column justify-content-center align-items-center text-center">
                <h4>{externalAccount?.meta?.name} </h4>
                <br />
                <div>{externalAccount?.address}</div>
              </Col>
              <div className="w-100" />
              <Col md="6" className="d-flex justify-content-between">
                <button className="btn btn-primary" onClick={() => onCancelHandler()}>Cancel</button>
                <button className="btn btn-primary" onClick={() => _setAccountHandler()}>Connect</button>
              </Col>
            </>
              )}
        </Row>
      </Card.Body>
    </>
  );
}
