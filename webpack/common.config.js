const path = require('path');

module.exports = {
  publicPath: path.join(__dirname, '..', 'server', 'build', 'static'),
  assetsPath: path.join(__dirname, '..', 'server', 'build', 'static'),
  commonLoaders: [
    {
      test: /\.(js|jsx)$/,
      use: {loader: 'babel-loader', options: {presets: ['react',['es2015', {modules: false}], 'stage-2'], plugins: ['transform-decorators-legacy']}},
      include: path.join(__dirname, '..', 'src', 'app'),
      exclude: path.join(__dirname, 'node_modules')
    }
  ],
};