var gulp = require('gulp'),
    del = require('del');

var cfg = require('../config');

gulp.task('clean-dev', function () {
    del.sync([cfg.project.target.base]);
});