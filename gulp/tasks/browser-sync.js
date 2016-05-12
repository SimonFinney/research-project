// BrowserSync

'use strict';

const browserSync = require('browser-sync');

module.exports = function(gulp, browserSyncConfig) {


  gulp.task('browser-sync', function() {
    browserSync.init(browserSyncConfig);
  });


  gulp.task('bs-reload', browserSync.reload);
};
