// Extras

'use strict';


module.exports = function(gulp, paths) {

  const extras = paths.extras;


  function appendPath(sourcePath, property) {
    return sourcePath + property;
  }


  function rm(sourcePath, destinationPath) {
    const e = [];

    for (const extra in extras) {

      if (Array.isArray(extras[extra])) {

        const pathArray = extras[extra];

        pathArray.forEach(function(pathArrayItem) {
          const isNot = '!';

          pathArrayItem = (pathArrayItem.indexOf(isNot) > -1) ? (isNot + appendPath(sourcePath, pathArrayItem.replace(isNot, ''))) : appendPath(sourcePath, pathArrayItem);
          e.push(pathArrayItem);
        });

      } else {

        e.push(appendPath(sourcePath, extras[extra]));
      }
    }

    return gulp.src(e, { base: sourcePath })
      .pipe(gulp.dest(destinationPath));
  }


  gulp.task('extras', function() {
    return rm(paths.app, paths.tmp);
  });


  gulp.task('extras:build', function() {
    delete extras['images'];
    return rm(paths.tmp, paths.distDir);
  });
};
