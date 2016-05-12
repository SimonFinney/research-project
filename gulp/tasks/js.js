// JavaScript

'use strict';

const webpack = require('webpack-stream');


module.exports = function(gulp, config) {

  gulp.task('js', function(done) {

    return gulp.src(config.paths.js + 'main.js')
      .pipe(webpack(config.webpack))
      .pipe(gulp.dest(config.paths.tmp + 'js'));
  });
};
