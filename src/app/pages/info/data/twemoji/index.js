const assets = {};

const requireCtx = require.context('./', false, /\.svg$/);
requireCtx
  .keys()
  .map(name =>
    assets[name.slice(2).split('.')[0]] = requireCtx(name)
  );

export default assets;
