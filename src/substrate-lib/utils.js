import { decodeAddress, encodeAddress } from '@polkadot/keyring';
import { hexToU8a, isHex, u8aToHex } from '@polkadot/util';
import BN from 'bn.js';
const utils = {
  validateAddress: (address, ss58Format) => {
    try {
      const decodedAddress = decodeAddress(address, ss58Format);
      const encodedAddress = encodeAddress(decodedAddress, ss58Format);
      return true;
    } catch (error) {
      return false;
    }
  },
  toUnit: (balance, decimals) => {
    if (!balance || !decimals) {
      return balance;
    }
    const B10 = new BN(10);
    const BDecimal = new BN(decimals);
    const base = B10.pow(BDecimal);
    const dm = new BN(balance).divmod(base);
    return `${dm.div.toString()}.${dm.mod.toString()}`;
  },
};

export default utils;
