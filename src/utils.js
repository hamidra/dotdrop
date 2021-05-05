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
};
