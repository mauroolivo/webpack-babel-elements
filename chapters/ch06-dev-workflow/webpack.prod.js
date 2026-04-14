const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: 'js/[name].[contenthash:8].js',
  },
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      __BUILD_MODE__: JSON.stringify('production'),
      __SOURCE_MAP_STRATEGY__: JSON.stringify('source-map'),
      __HMR_ENABLED__: JSON.stringify(false),
    }),
  ],
});