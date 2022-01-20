module.exports = {
  webpack: function (webpackConfig) {
    webpackConfig.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto'
    });

    return webpackConfig;
  },
  jest: function (config) {
    config.transformIgnorePatterns = [
      '/node_modules/(?!(@polkadot|@babel/runtime/helpers/esm)/)',
      '^.+\\.module\\.(css|sass|scss)$'
    ];
    return config;
  }
};
