var gulp = require('gulp');
var less = require('gulp-less')
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-cssnano');
var prefix = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var jslint = require('gulp-jslint');
var del = require('del');

gulp.task('styles', function () {
    return gulp.src('app/styles/main.less')
        .pipe(less())
        .pipe(minifyCSS())
        .pipe(prefix())
        .pipe(gulp.dest('dist/styles'));
});

gulp.task('test', function () {
    return gulp.src(['app/scripts/**/*.js', '!app/scripts/vendor/**/*.js'])
        .pipe(jslint());
});

gulp.task('clean', function () {
    return del(['dist']);
});

gulp.task('report', function (done) {
    console.log('We are done!');
    done();
});

gulp.task('scripts',
    gulp.series('test', function srcriptInternal() {
        return gulp.src(['app/scripts/vendor/**/*.js', 'app/scripts/**/*.js'])
            .pipe(concat('main.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest('dist'));
    }));

gulp.task('default',
    gulp.series('clean',
        gulp.parallel('styles', 'scripts')));