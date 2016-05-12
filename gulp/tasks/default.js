// Default

'use strict';

module.exports = function(gulp, runSequence) {

  gulp.task('default', function(done) {
    runSequence('rm', 'watch', 'browser-sync', done);
  });
};
