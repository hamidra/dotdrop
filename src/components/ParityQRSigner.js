import React, { useCallback, useState } from 'react';

import { QrDisplayPayload, QrScanSignature } from '@polkadot/react-qr';
import { isHex } from '@polkadot/util';
import { Spinner, Row, Col } from 'react-bootstrap';

const CMD_HASH = 1;
const CMD_MORTAL = 2;

function ParityQRSigner({
  address,
  genesisHash,
  isHashed,
  onSignature,
  payload,
}) {
  const [sigError, setSigError] = useState(null);

  const _onSignature = useCallback(
    (data) => {
      if (isHex(data.signature)) {
        onSignature(data);
      } else {
        const signature = data.signature;
        const sample =
          signature.length > 47
            ? `${signature.substr(0, 24)}…${signature.substr(-22)}`
            : signature;
        setSigError(
          'Non-signature, non-hex data received from QR. Data contains "{{sample}}" instead of a hex-only signature. Please present the correct signature generated from the QR presented for submission.'
        );
      }
    },
    [onSignature]
  );

  if (!address) {
    return <Spinner label={'Preparing QR for signing'} />;
  }

  return (
    <>
      <Row>
        <Col>
          <div>
            <QrDisplayPayload
              address={address}
              cmd={isHashed ? CMD_HASH : CMD_MORTAL}
              genesisHash={genesisHash}
              payload={payload}
            />
          </div>
        </Col>
        <Col>
          <div>
            <QrScanSignature onScan={_onSignature} />
          </div>
        </Col>
      </Row>
      <Row>
        <Col>{sigError && <div>sigError</div>}</Col>
      </Row>
    </>
  );
}

export default ParityQRSigner;
