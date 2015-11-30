var gulp = require('gulp'),
    gutil = require('gulp-util'),
    log = gutil.log,
    path = require('path'),
    sourcemaps = require('gulp-sourcemaps'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    tsify = require('tsify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer');

var cfg = require('../config');

function bundleScripts(opts) {
    var _base = opts.base || cfg.project.app.base,
        _entry = opts.entry || cfg.project.app.main,
        _dest = opts.dest || cfg.project.target.base,
        _out = opts.out || cfg.project.target.main,
        _watch = !!(opts.watch || false),
        _debug = !!(opts.debug || true),
        _browserify = null,
        _browserifyOpts = {
            basedir: _base,
            entries: path.join(_base, _entry),
            debug: _debug,
            cache: {}, // required by <watchify>, DO NOT CHANGE !!!
            packageCache: {}, // required by <watchify>, DO NOT CHANGE !!!
            fullPaths: true // required by <watchify>, DO NOT CHANGE !!!
        };

    function _bundle() {
        return _browserify.bundle()
            .on('error', log.bind(gutil, 'Browserify Error'))
            .pipe(source(_out))
            .pipe(buffer())
            .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(_dest));
    }

    if (_watch) {
        _browserify = watchify(browserify(_browserifyOpts))
            .plugin(tsify, cfg.typescript)
            .on('update', _bundle)
            .on('log', log);
    } else {
        _browserify = browserify(_browserifyOpts)
            .plugin(tsify, cfg.typescript);
    }

    return _bundle;
}

gulp.task('compile-dev', ['clean-dev'], bundleScripts({watch: false}));
gulp.task('compile-dev-watch', bundleScripts({watch: true}));