const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: 'js/[name].js',
  },
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    host: '127.0.0.1',
    port: 8096,
    hot: true,
    open: false,
    client: {
      overlay: true,
      logging: 'info',
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      __BUILD_MODE__: JSON.stringify('development'),
      __SOURCE_MAP_STRATEGY__: JSON.stringify('eval-cheap-module-source-map'),
      __HMR_ENABLED__: JSON.stringify(true),
    }),
  ],
});