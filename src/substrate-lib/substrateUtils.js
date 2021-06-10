import { decodeAddress, encodeAddress } from '@polkadot/keyring';
import { hexToU8a, isHex, u8aToHex } from '@polkadot/util';
import BN from 'bn.js';

const balancePrecision = 5;
const trimEnd = (str, char) => {
  if (!str) {
    return str;
  }
  let i = str.length;
  while (i > 0 && str.charAt(i - 1) === char) {
    i -= 1;
  }
  return str.substring(0, i);
};

const utils = {
  getAccountAddress: (account) => {
    const { pairOrAddress } = account;
    if (typeof pairOrAddress === 'string' || pairOrAddress instanceof String) {
      // the stored value is an address
      return pairOrAddress;
    } else {
      // the stored value is an account
      return pairOrAddress?.address;
    }
  },

  validateAddress: (address, ss58Format) => {
    try {
      const decodedAddress = decodeAddress(address, ss58Format);
      const encodedAddress = encodeAddress(decodedAddress, ss58Format);
      return true;
    } catch (error) {
      return false;
    }
  },

  formatBalance: (balance, decimalPoints) => {
    if (!balance) {
      return balance;
    }
    decimalPoints =
      decimalPoints === undefined ? balancePrecision : decimalPoints;
    const [wholeVal, decimalVal] = balance.split('.');
    let result = wholeVal;
    if (decimalVal) {
      result += `.${trimEnd(decimalVal?.substr(0, decimalPoints), '0')}`;
    }
    return result;
  },

  fromChainUnit: (value, chainDecimal, decimalPoints) => {
    if (!value || !chainDecimal) {
      return null;
    }
    chainDecimal = parseInt(chainDecimal);
    const B10 = new BN(10);
    const BChainUnit = B10.pow(new BN(chainDecimal));
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
      return null;
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
    return BChainWholeVal.add(BChainDecimalVal);
  },

  gteChainUnits: (units1, units2) => {
    const BUnits1 = new BN(units1, 10);
    const BUnits2 = new BN(units2, 10);
    return BUnits1.gte(BUnits2);
  },
};

export default utils;
