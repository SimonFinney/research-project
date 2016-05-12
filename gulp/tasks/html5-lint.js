// HTML5 validation

'use strict';

const html5Lint = require('gulp-html5-lint');

module.exports = function(gulp, tmpPath) {


  gulp.task('html5-lint', function() {
    return gulp.src(tmpPath + '**/*.html')
      .pipe(html5Lint());
  });
};
