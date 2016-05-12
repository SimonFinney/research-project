// Minify

'use strict';

const useref = require('gulp-useref');
const gulpIf = require('gulp-if');

const cssnano = require('gulp-cssnano');
const htmlmin = require('gulp-htmlmin');
const uglify = require('gulp-uglify');


module.exports = function(gulp, config) {


  gulp.task('minify', function() {

    const searchPath = config.paths.tmp.replace('/', '');

    return gulp.src(config.paths.tmp + '**/*.html')
      .pipe(useref({ searchPath: [searchPath, ''] }))
      .pipe(gulpIf('*.css', cssnano()))
      .pipe(gulpIf('*.js', uglify()))
      .pipe(gulpIf('*.html', htmlmin(config.htmlmin)))
      .pipe(gulp.dest(config.paths.distDir));
  });
};
