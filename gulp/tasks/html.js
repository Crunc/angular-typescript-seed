var gulp = require('gulp'),
    path = require('path');

var cfg = require('../config');

function copyHtml() {
    gulp.src(path.join(cfg.project.app.base, '/index.html'))
        .pipe(gulp.dest(cfg.project.target.base));
}

gulp.task('copy-html-dev', ['clean-dev'], copyHtml);
gulp.task('copy-html-dev-watch', copyHtml);