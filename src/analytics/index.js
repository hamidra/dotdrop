const analytics = {
    track: (event) => {
      let e = `nft_${event}`
      window.sa_event && window.sa_event(e);
    }
  };
export default analytics;