const images = [];

const requireCtx = require.context('assets/img/peepos', false, /\.(png|jpg|gif|webp)$/);
requireCtx.keys().map(name => {
    images.push(requireCtx(name));
});

export default images;
