var gulp = require('gulp'),
    log = require('gulp-util').log,
    path = require('path'),
    sourcemaps = require('gulp-sourcemaps'),
    sync = require('gulp-sync')(gulp),
    del = require('del'),
    browserify = require('browserify'),
    tsify = require('tsify'),

    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),

    through = require('through'),
    globby = require('globby'),

    connect = require('gulp-connect');

/*
 * Build Configuration
 */
var cfg = {

    /*
     * Project Structure
     */
    project: {
        app: {
            base: __dirname + '/src/app',
            main: 'app.ts'
        },
        assets: {
            base: __dirname + 'src/assets'
        },
        target: {
            base: __dirname + '/target',
            main: 'app.js'
        }
    },

    /*
     * TypeScript Compiler Options
     */
    typescript: {
        removeComments: false,
        target: 'ES5',
        module: 'es6',
        //noResolve: true,
        noImplicitAny: false
    },

    /*
     * Connect HTTP-Server Options
     */
    server: {
        port: 9042
    }
};

gulp.task('clean', function () {
    del.sync([cfg.project.target.base]);
});

gulp.task('compile-ts', function () {

    var bundledStream = through();

    bundledStream
        .pipe(source(cfg.project.target.main))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(cfg.project.target.base));

    globby([path.join(cfg.project.app.base, '/**/*.ts'), '!' + path.join(cfg.project.app.base, cfg.project.app.main)])
        .then(function (files) {

            // add app entry point as last file so all other files have been loaded before when this code is run
            files.push(path.join(cfg.project.app.base, cfg.project.app.main));

            log('tsc: ', files);

            browserify({entries: files, debug: true, basedir: cfg.project.app.base})
                .plugin(tsify, cfg.typescript)
                .bundle()
                .pipe(bundledStream);
        })
        .catch(function (err) {
            bundledStream.emit('error', err);
        })
});

gulp.task('copy-html', function () {
    gulp.src(path.join(cfg.project.app.base, '/index.html'))
        .pipe(gulp.dest(cfg.project.target.base));
});

gulp.task('run', function () {
    connect.server({
        root: cfg.project.target.base,
        port: cfg.server.port,
        livereload: false
    });
});

gulp.task('build-dev', sync.sync(['clean', 'compile-ts', 'copy-html']));