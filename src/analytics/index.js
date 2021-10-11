const analytics = {
  track: (event) => {
    window.sa_event && window.sa_event(event);
  }
};
export default analytics;
