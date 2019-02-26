const { spawn } = require('child_process');
const { resolve } = require('path');

const webpackPath = resolve(
  __dirname,
  '..',
  'node_modules',
  '.bin',
  process.platform === 'win32'
    ? 'webpack-cli.cmd'
    : 'webpack-cli'
);

const webpack = spawn(webpackPath, [
  '--config', resolve(__dirname, '..', 'webpack', 'webpack.config-client.js'),
  '--display-error-details',
  '--watch'
], { env: { FORCE_COLOR: true } });

webpack.on('error', (error) => {
  console.log('Webpack error:', error);
});

webpack.stdout.on('data', (data) => {
  data = String(data);
  switch (data.slice(0, 5)) {
    case '\nwebp':
      console.log('Webpack watcher initiated.\n');
      break;

    case 'Hash:':
      console.log('Bundle built:\n', data.slice(0, data.indexOf('Entrypoint')), '\n');
      break;
  }
});

webpack.on('close', (code) => {
  console.log('Webpack closed with code', code);
});