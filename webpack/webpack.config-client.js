const { publicPath, assetsPath, commonLoaders } = require('./common.config');
const webpack = require('webpack');
const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  mode: 'development',
  name: 'client',
  context: path.join(__dirname, '..', 'src', 'app'),
  entry: [ '@babel/polyfill', './index.js' ],
  output: {
    path: assetsPath,
    publicPath: publicPath,
    filename: 'bundle.js'
  },
  module: {
    rules: commonLoaders.concat([
      {
        test: /\.(sa|sc|c)ss$/,
        use: [ 'style-loader', 'css-loader', 'sass-loader' ]
      },
    ]),
  },
  resolve: {
    extensions: ['.jsx', '.js']
  },
  plugins: [
    new webpack.DefinePlugin({
      __PAYPAL_ENV__: '"sandbox"'
    }),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3001,
      proxy: 'http://localhost'
    })
  ]
};