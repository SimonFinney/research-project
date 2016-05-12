// ESLint

'use strict';

const eslint = require('gulp-eslint');

module.exports = function(gulp, jsPath) {

  gulp.task('eslint', function() {
    return gulp.src(jsPath)
      .pipe(eslint())
      .pipe(eslint.format());
  });
};
