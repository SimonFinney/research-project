// JavaScript

const webpack = require('webpack-stream');

module.exports = (gulp, config) =>
  gulp.task('js', () =>
    gulp.src(`${config.paths.js}index.js`)
      .pipe(webpack(config.webpack))
      .pipe(gulp.dest(`${config.paths.tmp}js`))
  );
