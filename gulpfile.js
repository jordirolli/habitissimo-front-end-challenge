'use strict';

var del = require('del');
var gulp = require('gulp');
var sass = require('gulp-sass');
var webpack = require('webpack');
var webpack_stream = require('webpack-stream');

var bases = {
 app: 'src/',
 dist: 'dist/',
};

var paths = {
 js: ['js/'],
 sass: ['sass/**/*.scss'],
 html: ['html/**/*.html']
};

// Delete the dist directory
gulp.task('clean', function() {
 return del([bases.dist + '*']);
});

gulp.task('sass', function () {
  return gulp.src(bases.app + paths.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(bases.dist + 'css'));
});

gulp.task('copy', function () {
  return gulp.src(bases.app + paths.html)
    .pipe(gulp.dest(bases.dist));
});

gulp.task('webpack', function() {
  return gulp.src(bases.app + paths.js + 'app.js')
    .pipe(webpack_stream({output: {filename: 'habitissimo.js'}}, webpack))
    .pipe(gulp.dest(bases.dist));
});

gulp.task('default', ['clean','sass', 'webpack', 'copy']);