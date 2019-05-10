const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const { DefinePlugin } = require('webpack');
const path = require('path');

process.env.NODE_ENV = 'development';

const src = path.resolve(__dirname, '..', 'src');

module.exports = {
  mode: 'development',
  name: 'client',
  entry: [ path.resolve(src, 'app', 'index.js') ],
  output: {
    path: path.resolve(src, 'server', 'root'),
    publicPath: '/',
    filename: 'build/[name].[contenthash:8].js',
    chunkFilename: 'build/[name].[contenthash:8].chunk.js'
  },
  resolve: {
    extensions: [ '.js', '.jsx' ]
  },
  optimization: {
    minimize: false,
    minimizer: [],
    splitChunks: {
      chunks: 'all'
    }
  },
  module: {
    strictExportPresence: true,
    rules: [
      { parser: { requireEnsure: false } },
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(src, 'app'),
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          cacheCompression: true,
          compact: true,
          presets: [
            '@babel/preset-react'
          ],
          plugins: [
            '@babel/plugin-syntax-dynamic-import',
            '@babel/plugin-proposal-class-properties'
          ]
        },
      },
      {
        test: /\.s?css$/,
        use: [
          MiniCSSExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(src, 'app', 'index.html'),
      filename: 'index.html'
    }),
    new MiniCSSExtractPlugin({
      filename: 'build/[name].[contenthash:8].css',
      chunkFilename: 'build/[name].[contenthash:8].chunk.css',
    }),
    new DefinePlugin({
      __PAYPAL_ENV__: '"sandbox"'
    }),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3001,
      proxy: 'http://localhost'
    })
  ]
};