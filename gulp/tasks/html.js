var gulp = require('gulp'),
    path = require('path');

var cfg = require('../config');

gulp.task('copy-html', ['clean'], function () {
    gulp.src(path.join(cfg.project.app.base, '/index.html'))
        .pipe(gulp.dest(cfg.project.target.base));
});