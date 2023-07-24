const config = {
  transformIgnorePatterns: [
    '/node_modules/(?!(@polkadot|@babel/runtime/helpers/esm)/)',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  setupFilesAfterEnv: ['<rootDir>/__tests__/setup.js'],
};

module.exports = config;
