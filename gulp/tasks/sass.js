
// Sass

'use strict';

const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync');

module.exports = (gulp, config) =>

  gulp.task('sass', () => gulp.src(config.paths.scss)
      .pipe(sourcemaps.init())
      .pipe(
        sass().on('error', sass.logError)
      )
      .pipe(autoprefixer(config.autoprefixer))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(config.paths.tmp + 'css'))
      .pipe(browserSync.stream())
  );
