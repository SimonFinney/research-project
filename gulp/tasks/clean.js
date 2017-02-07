// Clean

const del = require('del');

module.exports = (gulp, paths) =>
  gulp.task('clean', () =>
    del([paths.tmp, paths.dist])
  );
