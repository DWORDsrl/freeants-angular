// Include gulp
var gulp = require('gulp');
// Include plugins
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var del = require('del');

gulp.task('clean', function () {
    // Return the promise that del produces.
    return del(['dist']);
});
// DebugOld
gulp.task('debugOld', ['clean'], function () {
    return gulp.src(['src/module.js','src/*.js'])
      .pipe(concat('angularfreeants.debug.js'))
      .pipe(gulp.dest('dist'));
});
// minifyOld
gulp.task('minifyOld', ['clean'], function () {
    return gulp.src(['src/module.js', 'src/*.js'])
      .pipe(concat('angularfreeants.js'))
      .pipe(rename({ suffix: '.min' }))
      .pipe(uglify())
      .pipe(gulp.dest('dist'));
});

// Debug
gulp.task('debug', ['clean'], function () {
    return gulp.src(['src/module.js','src/*.js'])
      .pipe(concat('freeants-angular.debug.js'))
      .pipe(gulp.dest('dist'));
});
// minify
gulp.task('minify', ['clean'], function () {
    return gulp.src(['src/module.js', 'src/*.js'])
      .pipe(concat('freeants-angular.js'))
      .pipe(rename({ suffix: '.min' }))
      .pipe(uglify())
      .pipe(gulp.dest('dist'));
});

// Default Task
gulp.task('default', ['clean','debug', 'minify', 'debugOld', 'minifyOld']);
