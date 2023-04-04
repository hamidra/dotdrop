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

const trimStart = (str, char) => {
  if (!str) {
    return str;
  }
  let i = 0;
  while (i < str.length && str.charAt(i) === char) {
    i += 1;
  }
  return str.slice(i);
};

const utils = {
  getAccountAddress: (account) => {
    const { pairOrAddress } = account || {};
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

  getUsableBalances: (balances) => {
    const free = new BN(balances?.free || 0);
    const frozen = new BN(balances?.miscFrozen || 0);
    const usable = free?.gte(frozen) ? free?.sub(frozen) : new BN(0);
    return usable;
  },

  /**
   * formats a balance by removing leading (and trailing if decimal) zeros and adding token symbol
   * @param {*} balance the balance value in string
   * @param {*} token the token symbol (e.g. DOT, KSM)
   * @param {*} decimalPoints a string or number  that specifies the number of digits after decimal point.
   * @returns formatted balance in string
   */
  formatBalance: (balance, token, decimalPoints) => {
    if (!balance) {
      return balance;
    }
    let [wholeVal, decimalVal] = balance.split('.');
    wholeVal = trimStart(wholeVal, '0');
    let result = wholeVal || '0';
    if (decimalVal) {
      if (decimalPoints && !isNaN(decimalPoints)) {
        decimalVal = decimalVal.slice(0, decimalPoints);
      }
      decimalVal = trimEnd(decimalVal, '0');
      if (decimalVal) {
        result += `.${decimalVal}`;
      }
    }
    if (token) {
      result = `${result} ${token}`;
    }
    return result;
  },

  /**
   * convert a value from chain unit to a base 10 decimal number
   * @param {*} value the value in chain unit (in string or BN)
   * @param {*} chainDecimal chain token decimals
   * @param {*} decimalPoints number of digits to keep after decimal points
   * @returns  the value in base 10 decimal format in string
   */
  fromChainUnit: (value, chainDecimal, decimalPoints) => {
    if ((!value && value != 0) || !chainDecimal) {
      return null;
    }
    chainDecimal = parseInt(chainDecimal);
    value = new BN(value);
    const B10 = new BN(10);
    const BChainUnit = B10.pow(new BN(chainDecimal));
    const dm = value.divmod(BChainUnit);
    const wholeStr = dm.div.toString();
    let decimalStr = dm.mod.toString().padStart(chainDecimal, '0');
    if (decimalPoints || decimalPoints === 0) {
      decimalStr = decimalStr?.slice(0, decimalPoints);
    }
    decimalStr = trimEnd(decimalStr, '0');
    let result = wholeStr;

    if (decimalStr) {
      result += `.${decimalStr}`;
    }
    return result;
  },

  toChainUnit: (value, chainDecimal) => {
    if ((!value && value != 0) || !chainDecimal) {
      return null;
    }
    value = value.toString();
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
  },
};

export default utils;
