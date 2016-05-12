// Move

'use strict';

module.exports = function(gulp, runSequence) {


  gulp.task('rm', function(done) {
    runSequence('clean', 'html', 'sass', 'js', 'extras', done);
  });
};
