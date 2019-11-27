const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');
const fs = require('fs');
const path = require('path');
const WorkboxPlugin = require('workbox-webpack-plugin');

require('string.prototype.matchall').shim();

process.env.NODE_ENV = 'production';

const src = path.resolve(__dirname, '..', 'src');

module.exports = {
  mode: 'production',
  name: 'client',
  entry: [ path.resolve(src, 'app', 'index.js') ],
  output: {
    path: path.resolve(src, 'server', 'build'),
    publicPath: '/',
    filename: '[name].[contenthash:8].js',
    chunkFilename: '[name].[contenthash:8].chunk.js'
  },
  resolve: {
    extensions: [ '.js', '.jsx' ],
    alias: {
      assets: path.resolve(src, 'app', 'assets')
    }
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
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-proposal-export-default-from',
            '@babel/plugin-proposal-object-rest-spread'
          ]
        },
      },
      {
        test: /\.s?css$/,
        use: [
          MiniCSSExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass')
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif|webp)$/,
        use: [
          'file-loader'
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
      filename: '[name].[contenthash:8].css',
      chunkFilename: '[name].[contenthash:8].chunk.css',
    }),
    new DefinePlugin({
      __PAYPAL_ENV__: '"production"'
    }),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true
    }),
    {
      apply: (compiler) =>
        compiler.hooks.compile.tap('cleanBuild', () => {
          const buildDir = path.resolve(src, 'server', 'build');
          for (const filename of fs.readdirSync(buildDir)) {
            fs.unlinkSync(path.resolve(buildDir, filename));
          }
        })
    },
    {
      apply: (compiler) =>
        compiler.hooks.compile.tap('miscFiles', () => {
          const appDir = path.resolve(src, 'app');
          const buildDir = path.resolve(src, 'server', 'build');
          const appFile = fs.readFileSync(path.resolve(appDir, 'App.jsx'), 'utf8');

          const sitemapTemplate = fs.readFileSync(path.resolve(appDir, 'sitemap.xml'), 'utf8');
          let sitemapLocations = '';
          for (const [ , match ] of appFile.matchAll(/path="(.*?)"/g)) {
            sitemapLocations += `<url><loc>https://dankmemer.lol${match}</loc></url>`;
          }

          fs.writeFileSync(
            path.resolve(buildDir, 'sitemap.xml'),
            sitemapTemplate.replace('$locations', sitemapLocations)
          );
          fs.copyFileSync(
            path.resolve(appDir, 'robots.txt'),
            path.resolve(buildDir, 'robots.txt')
          );
        })
    }
  ]
};