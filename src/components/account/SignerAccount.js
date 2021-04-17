import { QrScanAddress } from '@polkadot/react-qr';
import { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { useSubstrate } from '../../substrate-lib';

export default function SignerAccount({ setAccountHandler }) {
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
          isExternal: true,
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
    setAccountHandler(externalAccount);
  };
  return (
    <>
      <Row>
        <Col>Scan your account QRCode from your signer app</Col>
      </Row>
      {showReader ? (
        <Row className="justify-content-center">
          <Col md="6">
            <QrScanAddress onScan={(scanned) => onScanHandler(scanned)} />
          </Col>
        </Row>
      ) : (
        <Row>
          <Col>{externalAccount.address}</Col>
        </Row>
      )}
      <Row>
        <Col>
          <Button onClick={() => onCancelHandler()}>Cancel</Button>
        </Col>
        <Col>
          <Button onClick={() => _setAccountHandler()}>Add</Button>
        </Col>
      </Row>
    </>
  );
}
