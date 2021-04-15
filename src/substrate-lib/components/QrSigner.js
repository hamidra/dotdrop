// This QRSigner is ported from polkadot-JS
// Original Code at: https://github.com/polkadot-js/apps/blob/bd78840d2142df121d182e8700b20308880dde0a/packages/react-signer/src/signers/QrSigner.ts

import { blake2AsU8a } from '@polkadot/util-crypto';

export default class QrSigner {
  constructor(registry, setState) {
    this.registry = registry;
    this.setState = setState;
  }

  async signPayload(payload) {
    return new Promise((resolve, reject) => {
      // limit size of the transaction
      const isQrHashed = payload.method.length > 5000;
      const wrapper = this.registry.createType('ExtrinsicPayload', payload, {
        version: payload.version,
      });
      const qrPayload = isQrHashed
        ? blake2AsU8a(wrapper.toU8a(true))
        : wrapper.toU8a();

      this.setState({
        isQrHashed,
        qrAddress: payload.address,
        qrPayload,
        qrReject: reject,
        qrResolve: resolve,
      });
    });
  }
}
