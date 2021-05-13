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
  fromChainUnit: (value, chainDecimals, decimalPoints) => {
    if (!value || !chainDecimals) {
      return value;
    }
    const B10 = new BN(10);
    const BChainDecimal = new BN(chainDecimals);
    const BnChainUnit = B10.pow(BChainDecimal);
    const dm = new BN(value).divmod(BnChainUnit);
    return `${dm.div.toString()}.${dm.mod.toString().substr(0, decimalPoints)}`;
  },

  toChainUnit: (value, chainDecimals) => {
    if (!value || !chainDecimals) {
      return value;
    }
    const B10 = new BN(10);
    const BChainDecimal = new BN(chainDecimals);
    const BnChainUnit = B10.pow(BChainDecimal);
    const BnAmount = new BN(value, 10);
    return BnAmount.mul(BnChainUnit).toString();
  },

  isAboveMinDeposit: (units, minDeposit) => {
    const BUnits = new BN(units, 10);
    const BMinDeposit = new BN(minDeposit, 10);
    return BUnits.gte(BMinDeposit);
  },
};

export default utils;
