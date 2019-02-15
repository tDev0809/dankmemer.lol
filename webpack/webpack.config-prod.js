const { publicPath, assetsPath, commonLoaders } = require('./common.config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: 'production',
  name: 'client',
  context: path.join(__dirname, '..', 'src', 'app'),
  entry: ['babel-polyfill', './index.js'],
  output: {
    path: assetsPath,
    publicPath: publicPath,
    filename: 'bundle.js'
  },
  module: {
    rules: commonLoaders.concat([
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: {loader: 'css-loader', options: {minimize: true}}
        })
      },
      {
        test: /\.svg$/,
        use: 'svg-react-loader'
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: {loader: 'file-loader', options: {publicPath: '/'}}
      }
    ]),
  },
  resolve: {
    extensions: ['.jsx', '.js']
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
    new webpack.DefinePlugin({
      __PAYPAL_ENV__: '"production"'
    })
  ]
};