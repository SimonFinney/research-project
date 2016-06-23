// Move

'use strict';

module.exports = (gulp, runSequence) => gulp.task('rm', done => runSequence('clean', 'html', 'sass', 'js', 'extras', done));
