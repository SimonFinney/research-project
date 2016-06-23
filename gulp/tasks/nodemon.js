// Nodemon

'use strict';

const nodemon = require('gulp-nodemon');
let hasNodemonStarted = false;


function onNodemonStart(callback) {

  if (!hasNodemonStarted) {
    hasNodemonStarted = !hasNodemonStarted;
    callback();
  }
}


module.exports = (gulp, nodemonConfig) =>

  gulp.task('nodemon', (callback) =>
    nodemon(nodemonConfig).on('start', () => onNodemonStart(callback))
  );
