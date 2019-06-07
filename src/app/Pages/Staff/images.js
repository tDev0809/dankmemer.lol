const images = {};

const requireCtx = require.context('./assets', false, /\.(png|jpg|gif)$/);
requireCtx
  .keys()
  .map(name =>
    images[name.slice(2, -4)] = requireCtx(name)
  );

export default images;
