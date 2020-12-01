const images = {};

const requireCtx = require.context('assets/img/staff', false, /\.(png|jpg|gif|webp)$/);
requireCtx
  .keys()
  .map(name =>
    images[name.slice(2).split('.')[0]] = requireCtx(name)
  );

export default images;
