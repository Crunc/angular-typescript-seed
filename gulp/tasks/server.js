var gulp = require('gulp'),
    connect = require('gulp-connect');

var cfg = require('../config');

gulp.task('run-dev', function () {
    connect.server({
        root: cfg.project.target.base,
        port: cfg.server.port,
        livereload: false
    });
});