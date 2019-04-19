const { readFileSync } = require('fs');
const { resolve } = require('path');
const marked = require('marked');
const browserSync = require('browser-sync');

const blogsPath = resolve(__dirname, '..', 'data', 'blogs');
const blogsMetadataPath = resolve(blogsPath, 'blogs.json');

const getBlogs = () => require(blogsMetadataPath)
  .map(blog => ({
    ...blog,
    id: blog.filename.slice(0, -3),
    content: marked(readFileSync(resolve(blogsPath, blog.filename), 'utf8'))
  }));

module.exports = getBlogs();

if (process.env.NODE_ENV === 'development') {
  const watch = require('node-watch');

  watch(blogsPath, { recursive: true }, () => {
    while (module.exports.length) {
      module.exports.pop();
    }

    delete require.cache[require.resolve(blogsMetadataPath)];
    module.exports.push(...getBlogs());
    browserSync.instances[0].reload();
  });
}