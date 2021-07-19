import { decodeAddress, encodeAddress } from '@polkadot/keyring';
import BN from 'bn.js';

const feeAdjustMultiplier = 130; // the adjustment will be in percent (fee*feeAdjustMultiplier/100)
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

  formatBalance: (balance, token) => {
    if (!balance) {
      return balance;
    }
    const [wholeVal, decimalVal] = balance.split('.');
    let result = wholeVal;
    if (decimalVal) {
      result += `.${trimEnd(decimalVal, '0')}`;
    }
    if (token) {
      result =
        parseInt(wholeVal) > 1 ? `${result} ${token}s` : `${result} ${token}`;
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
    let decimalStr = dm.mod.toString().padStart(chainDecimal, '0');
    if (decimalPoints) {
      decimalStr = decimalStr?.substr(0, decimalPoints);
    }
    decimalStr = trimEnd(decimalStr, '0');
    let result = wholeStr;

    if (decimalStr) {
      result += `.${decimalStr}`;
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
  calcFeeAdjustments: (fee) => {
    return new BN(fee || 0).muln(feeAdjustMultiplier).divn(100);
  }
};

export default utils;
