// Watch

module.exports = (gulp, runSequence, paths) =>

  gulp.task('watch', () => {
    gulp.watch('templates/**/*', () => runSequence('bs-reload'));
    gulp.watch(`${paths.js}**`, () => runSequence('eslint', 'js', 'bs-reload'));
    gulp.watch(paths.scss, () => runSequence('sass-lint', 'sass'));
  });
