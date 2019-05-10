const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');
const fs = require('fs');
const path = require('path');

process.env.NODE_ENV = 'production';

const src = path.resolve(__dirname, '..', 'src');

module.exports = {
  mode: 'production',
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
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8
          },
          compress: {
            ecma: 5,
            warnings: false,
            inline: 2
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true
          }
        },
        parallel: true,
        cache: true
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          map: false
        }
      })
    ],
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
      __PAYPAL_ENV__: '"production"'
    }),
    {
      apply: (compiler) =>
        compiler.hooks.compile.tap('cleanBuild', () => {
          const buildDir = path.resolve(src, 'server', 'root', 'build');
          for (const filename of fs.readdirSync(buildDir)) {
            fs.unlinkSync(path.resolve(buildDir, filename));
          }
        })
    }
  ]
};