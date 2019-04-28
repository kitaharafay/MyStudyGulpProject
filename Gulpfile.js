var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var minifyCSS = require('gulp-cssnano');
var prefix = require('gulp-autoprefixer');

gulp.task('copy', function () {
  return gulp.src('app/scripts/**/*.js')
    .pipe(gulp.dest('dist'));
});

gulp.task('script', function () {
  return gulp.src('app/scripts/**/*.js')
    .pipe(uglify())
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('styles', function () {
  return gulp.src('app/styles/main.less')
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(prefix())
    .pipe(gulp.dest('dist/styles'));
});

gulp.task('test', function(){
  return gulp.src('app/scripts/**/*.js', '!app/scripts/vendor/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});