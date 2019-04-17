const path = require('path');

module.exports = {
  publicPath: path.join(__dirname, '..', 'src', 'server', 'root'),
  assetsPath: path.join(__dirname, '..', 'src', 'server', 'root'),
  commonLoaders: [
    {
      test: /\.(js|jsx)$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [ '@babel/preset-env', '@babel/preset-react' ]
        }
      },
      include: path.join(__dirname, '..', 'src', 'app'),
      exclude: path.join(__dirname, 'node_modules')
    },
  ]
};