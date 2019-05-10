module.exports = require(
  process.argv.includes('-p')
    ? './prod.cfg.js'
    : './dev.cfg.js'
);
