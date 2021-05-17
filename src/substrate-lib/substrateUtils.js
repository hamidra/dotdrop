import { decodeAddress, encodeAddress } from '@polkadot/keyring';
import { hexToU8a, isHex, u8aToHex } from '@polkadot/util';
import BN from 'bn.js';

const trimEnd = (str, char) => {
  let i = str.length;
  while (i > 0 && str.charAt(i - 1) === char) {
    i -= 1;
  }
  return str.substring(0, i);
};

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
  fromChainUnit: (value, chainDecimal, decimalPoints) => {
    if (!value || !chainDecimal) {
      return value;
    }
    chainDecimal = parseInt(chainDecimal);
    const B10 = new BN(10);
    const BChainDecimal = new BN(chainDecimal);
    const BChainUnit = B10.pow(BChainDecimal);
    const dm = new BN(value).divmod(BChainUnit);
    const wholeStr = dm.div.toString();
    const decimalStr = trimEnd(
      dm.mod.toString().padStart(chainDecimal, '0'),
      '0'
    );
    let result = wholeStr;
    if (decimalStr) {
      result += `.${decimalStr.substr(0, decimalPoints)}`;
    }
    return result;
  },

  toChainUnit: (value, chainDecimal) => {
    if (!value || !chainDecimal) {
      return value;
    }
    chainDecimal = parseInt(chainDecimal);
    const B10 = new BN(10);
    let [wholeVal, decimalVal] = value.split('.');
    decimalVal = decimalVal && decimalVal.substr(0, chainDecimal);
    const decimalValLen = decimalVal?.length || 0;
    const BWholeVal = new BN(wholeVal);
    const BDecimalVal = new BN(decimalVal || 0);

    const BChainWholeVal = BWholeVal.mul(B10.pow(new BN(chainDecimal)));
    const BChainDecimalVal = BDecimalVal.mul(
      B10.pow(new BN(chainDecimal - decimalValLen))
    );
    return BChainWholeVal.add(BChainDecimalVal).toString();
  },

  isAboveMinDeposit: (units, minDeposit) => {
    const BUnits = new BN(units, 10);
    const BMinDeposit = new BN(minDeposit, 10);
    return BUnits.gte(BMinDeposit);
  },
};

export default utils;
