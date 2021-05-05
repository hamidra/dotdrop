import { decodeAddress, encodeAddress } from '@polkadot/keyring';
import { hexToU8a, isHex, u8aToHex } from '@polkadot/util';

const utils = {
  validateAddress: (address, ss58Format) => {
    try {
      const decodedAddress = decodeAddress(address, ss58Format);
      const encodedAddress = encodeAddress(decodedAddress, ss58Format);
      return address === encodedAddress;
    } catch (error) {
      return false;
    }
  },
};

export default utils;
