const balancePrecision = 5;

export const stringHelpers = {
  truncateMiddle: (str, padLength) => {
    let truncated = str;
    if (str && padLength && 2 * padLength < str.length) {
      truncated = `${str.substring(0, padLength)}...${str.substring(
        str.length - padLength
      )}`;
    }
    return truncated;
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
      result += `.${decimalVal?.substr(0, decimalPoints)}`;
    }
    return result;
  },
};
