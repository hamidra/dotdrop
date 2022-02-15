module.exports = {
  webpack: function (webpackConfig) {
    webpackConfig.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto'
    });

    // This is added to patch react v.17 issue, can be removed when upgraded ro react v.18
    webpackConfig.resolve.alias = {
      ...webpackConfig?.resolve?.alias,
      'react/jsx-dev-runtime': 'react/jsx-dev-runtime.js',
      'react/jsx-runtime': 'react/jsx-runtime.js'
    };

    return webpackConfig;
  },
  jest: function (config) {
    config.transformIgnorePatterns = [
      '/node_modules/(?!(@polkadot|@babel/runtime/helpers/esm)/)',
      '^.+\\.module\\.(css|sass|scss)$'
    ];
    config.setupFilesAfterEnv = ['<rootDir>/__tests__/setup.js'];
    return config;
  }
};
