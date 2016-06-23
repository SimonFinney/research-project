// BrowserSync

'use strict';

const browserSync = require('browser-sync');

module.exports = (gulp, browserSyncConfig) => {

  gulp.task('browser-sync', ['nodemon'], () =>
    browserSync.init(browserSyncConfig)
  );

  gulp.task('bs-reload', browserSync.reload);
};
