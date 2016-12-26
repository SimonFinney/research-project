const browserSync = require('browser-sync');
const config = require('./gulp/config');
const gulp = require('gulp');
const runSequence = require('run-sequence');

// BrowserSync
require('./gulp/tasks/browser-sync')(gulp, browserSync, config.browserSync);

// Build
require('./gulp/tasks/build')(gulp, runSequence);

// Clean
require('./gulp/tasks/clean')(gulp, config.paths);

// Default
require('./gulp/tasks/default')(gulp, runSequence, config.paths);

// ESLint
require('./gulp/tasks/eslint')(gulp, config.paths.js);

// JavaScript
require('./gulp/tasks/js')(gulp, config);

// Minify
require('./gulp/tasks/minify')(gulp, config.paths);

// Move
require('./gulp/tasks/rm')(gulp, runSequence);

// Nodemon
require('./gulp/tasks/nodemon')(gulp, config.nodemon);

// Sass
require('./gulp/tasks/sass')(gulp, browserSync, config);

// Sass-Lint
require('./gulp/tasks/sass-lint')(gulp, config.paths);

// Watch
require('./gulp/tasks/watch')(gulp, runSequence, config.paths);
