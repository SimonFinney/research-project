// Build

module.exports = (gulp, runSequence) =>
  gulp.task('build', callback =>
    runSequence('rm', 'minify', callback)
  );
