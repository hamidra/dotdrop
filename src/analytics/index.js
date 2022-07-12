const analytics = {
  track: (event) => {
    const e = `nft_${event}`;
    window.sa_event && window.sa_event(e);
  }
};
export default analytics;
