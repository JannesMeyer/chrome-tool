global.chrome = {
  browserAction: {
    getTitle(detail, callback) {
      callback(detail);
    },
    setBadgeText() {},
  },
  management: {},
  runtime: {},
  storage: {
    sync: {}
  },
  tabs: {},
  windows: {},
};