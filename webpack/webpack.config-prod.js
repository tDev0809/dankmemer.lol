const { publicPath, assetsPath, commonLoaders } = require('./common.config');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: 'production',
  name: 'client',
  context: path.join(__dirname, '..', 'src', 'app'),
  entry: [ '@babel/polyfill', './index.js' ],
  output: {
    path: assetsPath,
    publicPath: publicPath,
    filename: 'bundle.js'
  },
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin(),
      new UglifyJSPlugin({
        cache: true,
        parallel: true
      })
    ]
  },
  module: {
    rules: commonLoaders.concat([
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCSSExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }
    ]),
  },
  resolve: {
    extensions: ['.jsx', '.js']
  },
  plugins: [
    new MiniCSSExtractPlugin({
      filename: 'style.css'
    }),
    new webpack.DefinePlugin({
      __PAYPAL_ENV__: '"production"'
    })
  ]
};