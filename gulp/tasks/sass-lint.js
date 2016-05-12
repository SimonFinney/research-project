// Sass Lint

'use strict';

const sassLint = require('gulp-sass-lint');

module.exports = function(gulp, paths) {


  gulp.task('sass-lint', function() {
    return gulp.src(paths.scss)
      .pipe(sassLint())
      .pipe(sassLint.format());
  });
};
