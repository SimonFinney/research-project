// BrowserSync

module.exports = (gulp, browserSync, browserSyncConfig) => {
  gulp.task('browser-sync', ['nodemon'], () =>
    browserSync.init(browserSyncConfig)
  );

  gulp.task('bs-reload', browserSync.reload);
};
