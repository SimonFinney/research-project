// Sass Lint

const sassLint = require('gulp-sass-lint');

module.exports = (gulp, paths) =>
  gulp.task('sass-lint', () =>
    gulp.src(paths.scss)
      .pipe(sassLint())
      .pipe(sassLint.format())
  );
