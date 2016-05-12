// Images

'use strict';

const imagemin = require('gulp-imagemin');

module.exports = function(gulp, config) {


  gulp.task('images', function() {


    return gulp.src(config.paths.tmp + config.paths.extras.images)
      .pipe(imagemin(config.imagemin))
      .pipe(gulp.dest(config.paths.distDir));
  });
};
