// HTML

'use strict';

module.exports = function(gulp, paths) {


  gulp.task('html', function(done) {
    return gulp.src(paths.html)
      .pipe(gulp.dest(paths.tmp));
  });
};
