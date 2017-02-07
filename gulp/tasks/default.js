// Default

module.exports = (gulp, runSequence) =>
  gulp.task('default', callback =>
    runSequence('rm', 'watch', 'browser-sync', callback)
  );
