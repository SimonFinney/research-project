// Minify

const cssnano = require('gulp-cssnano');
const gulpIf = require('gulp-if');
const uglify = require('gulp-uglify');

module.exports = (gulp, paths) =>
  gulp.task('minify', () => {
    return gulp.src(`${paths.tmp}**/*.{css,js}`)
      .pipe(gulpIf('*.css', cssnano()))
      .pipe(gulpIf('*.js', uglify()))
      .pipe(gulp.dest(paths.dist));
  });
