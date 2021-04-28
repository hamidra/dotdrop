import { QrScanAddress } from '@polkadot/react-qr';
import { useState, useContext } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { useSubstrate } from '../../../substrate-lib';
import { GenerateContext } from './GenerateMain';

export default function SignerAccount({ setAccountHandler }) {
  // signer format
  // substrate:13Q6RcqeAjvUCrYhdKdeqzUpHMJRishtxLByQn9YkyvMsYKa:0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3:test
  const { keyring } = useSubstrate();
  const [showReader, setShowReader] = useState('true');
  const [externalAccount, setExternalAccount] = useState(null);
  const { prevStep } = useContext(GenerateContext);
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
      <Row className="p-3 text-center">
        <div onClick={() => prevStep()}>{'<-'}</div>
        <Col>
          <h3>Scan your account QRCode from your signer app</h3>
        </Col>
      </Row>
      {showReader ? (
        <Row className="justify-content-center align-items-center">
          <Col md="6" style={{ height: 400 }}>
            <QrScanAddress onScan={(scanned) => onScanHandler(scanned)} />
          </Col>
        </Row>
      ) : (
        <Row className="justify-content-center align-items-center">
          <Col
            style={{ height: 400 }}
            className="d-flex flex-column justify-content-center align-items-center text-center">
            <h4>{externalAccount?.meta?.name} </h4>
            <br />
            <div>{externalAccount?.address}</div>
          </Col>
          <div className="w-100" />
          <Col md="6" className="d-flex justify-content-between">
            <Button onClick={() => onCancelHandler()}>Cancel</Button>
            <Button onClick={() => _setAccountHandler()}>Add</Button>
          </Col>
        </Row>
      )}
    </>
  );
}
