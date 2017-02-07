// ESLint

const eslint = require('gulp-eslint');

module.exports = (gulp, jsPath) =>
  gulp.task('eslint', () =>
    gulp.src(jsPath)
      .pipe(eslint())
      .pipe(eslint.format())
  );
