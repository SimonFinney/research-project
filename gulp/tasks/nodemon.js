// Nodemon

const nodemon = require('gulp-nodemon');
let hasNodemonStarted = false;


function start(callback) {
  if (!hasNodemonStarted) {
    hasNodemonStarted = !hasNodemonStarted;
    callback();
  }
}


module.exports = (gulp, nodemonConfig) =>

  gulp.task('nodemon', (callback) =>
    nodemon(nodemonConfig).on('start', () => start(callback))
  );
