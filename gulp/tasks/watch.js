// Watch

'use strict';

module.exports = function(gulp, runSequence, paths) {

  gulp.task('watch', function() {

    // Watch for changes
    gulp.watch([
      paths.html,
    ], function() {
      runSequence('html', 'html5-lint', 'bs-reload');
    });

    gulp.watch(paths.app + paths.extras.images, function() {
      runSequence('extras', 'bs-reload');
    });

    gulp.watch(paths.js + '**', function() {
      runSequence('eslint', 'js', 'bs-reload');
    });

    gulp.watch(paths.scss, function() {
      runSequence('sass-lint', 'sass');
    });
  });
};
