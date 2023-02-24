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
  formatGiftSecret: (giftSecret) => {
    if (!giftSecret?.length) return giftSecret;
    const formatted = [];
    for (let i = 0; i < giftSecret.length; i += 4) {
      formatted.push(giftSecret.slice(i, i + 4));
    }
    return formatted.join(' ');
  },
  removeSpaces: (giftSecret) => {
    return giftSecret?.replace(/[\s]*/g, '');
  },
  validateGiftSecret: (giftSecret) => {
    let error;
    if (!giftSecret || !/^[\w ]+$/i.test(giftSecret)) {
      error = 'Please enter a valid gift secret.';
    } else if (giftSecret.length < 16) {
      error =
        'Please enter a valid gift secret. The secret must include at least 16 digits';
    } else if (giftSecret.length > 32) {
      error =
        'Please enter a valid gift secret. The secret can not include more than 32 characters';
    }
    return error;
  },
};
