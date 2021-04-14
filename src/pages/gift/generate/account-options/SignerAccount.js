import { QrScanAddress } from '@polkadot/react-qr';
import { useContext, useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { useSubstrate } from '../../../../substrate-lib';
import { GenerateContext } from '../GenerateMain';

export default function SignerAccount() {
  // signer format
  // substrate:13Q6RcqeAjvUCrYhdKdeqzUpHMJRishtxLByQn9YkyvMsYKa:0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3:test
  const { prevStep, nextStep, setAccount } = useContext(GenerateContext);
  const { keyring } = useSubstrate();
  const [showReader, setShowReader] = useState('true');
  const [externalAccount, setExternalAccount] = useState(null);
  const onSendHandler = (scannedAccount) => {
    console.log(scannedAccount);
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

  const cancelHandler = () => {
    setExternalAccount(null);
    setShowReader(true);
  };

  const addHandler = () => {
    // ToDO: validate account is not empty
    setAccount(externalAccount);
    nextStep();
  };
  return (
    <>
      <Row>
        <Col>
          <Button onClick={() => prevStep()}>Back</Button>
        </Col>
      </Row>
      <Row>
        <Col>Scan your account QRCode from your signer app</Col>
      </Row>
      {showReader ? (
        <Row className="justify-content-center">
          <Col md="6">
            <QrScanAddress onScan={(scanned) => onSendHandler(scanned)} />
          </Col>
        </Row>
      ) : (
        <Row>
          <Col>{externalAccount.address}</Col>
        </Row>
      )}
      <Row>
        <Col>
          <Button onClick={() => cancelHandler()}>Cancel</Button>
        </Col>
        <Col>
          <Button onClick={() => addHandler()}>Add</Button>
        </Col>
      </Row>
    </>
  );
}
