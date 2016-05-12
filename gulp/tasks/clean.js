// Clean

'use strict';

const del = require('del');

module.exports = function(gulp, paths) {


  gulp.task('clean', function(done) {
    del([paths.tmp, paths.distDir])
      .then(function() {
        done();
      });
  });
};
