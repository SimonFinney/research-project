// Minify

const cssnano = require('gulp-cssnano');
const gulpIf = require('gulp-if');
const uglify = require('gulp-uglify');
const useref = require('gulp-useref');

module.exports = (gulp, paths) =>
  gulp.task('minify', () => {
    const searchPath = paths.tmp.replace('/', '');

    return gulp.src(paths.templates)
      .pipe(useref({ searchPath: [searchPath, ''] }))
      .pipe(gulpIf('*.css', cssnano()))
      .pipe(gulpIf('*.js', uglify()))
      .pipe(gulp.dest(paths.dist));
  });
