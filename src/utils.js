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
    const formatted = [];
    for (let i = 0; i < giftSecret.length; i += 4) {
      formatted.push(giftSecret.slice(i, i + 4));
    }
    return formatted.join(' ');
  }
};
