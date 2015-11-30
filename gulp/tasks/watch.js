var gulp = require('gulp'),
    path = require('path');

var cfg = require('../config');

gulp.task('watch', ['compile-dev-watch'], function () {
    gulp.watch(path.join(cfg.project.app.base, '/**/*.html'), ['copy-html-dev-watch']);
});