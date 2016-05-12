// Build

'use strict';

module.exports = function(gulp, runSequence) {


  gulp.task('build', function(callback) {
    runSequence('rm', 'minify', 'images', 'extras:build', callback);
  });
};
