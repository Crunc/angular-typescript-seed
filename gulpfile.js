var gulp = require('gulp'),
    typescript = require('gulp-typescript'),
    sourcemaps = require('gulp-sourcemaps'),
    sync = require('gulp-sync')(gulp),
    del = require('del'),
    path = require('path');

/*
 * Build Configuration
 */
var cfg = {

    /*
     * Project Structure
     */
    project: {
        app: {
            base: __dirname + '/src/app'
        },
        assets: {
            base: __dirname + 'src/assets'
        },
        dest: __dirname + '/target'
    },

    /*
     * TypeScript Compiler Options
     */
    typescript: {
        removeComments: false,
        target: 'ES5',
        module: 'system',
        noExternalResolve: false,
        noImplicitAny: false
    }

};

var tsProject = typescript.createProject(cfg.typescript);
gulp.task('compile-ts', function () {
    gulp.src(cfg.project.app.base + '/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(typescript(tsProject))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(cfg.project.dest));
});

gulp.task('clean', function () {
    del.sync([
        path.join(cfg.project.dest, '/**/*.js'),
        path.join(cfg.project.dest, '/**/*.map')
    ]);
});

gulp.task('build-dev', sync.sync(['clean', 'compile-ts']));