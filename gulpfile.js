var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var data = require('gulp-data');
var fs = require('fs');

// load env vars from .env
require('dotenv').load();

function loadJson(file, cb) {
  fs.readFile('./src/data.json', 'utf8', function(errRead, data) {
    if (errRead) {
      cb(undefined, {});
    } else {
      var jsData = JSON.parse(data);
      cb(undefined, jsData);
    }
  });
}

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'jade'], function() {

  browserSync.init({
    server: "./public"
  });

  gulp.watch("./src/sass/*.sass", ['sass']);
  gulp.watch("./src/**/*.jade", ['jade']);
  gulp.watch("./src/**/*.json", ['jade']);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src("src/sass/main.sass")
    .pipe(sass())
    .pipe(gulp.dest("public/css"))
    .pipe(browserSync.stream());
});

gulp.task('jade', function() {
  gulp.src('./src/**/*.jade')
    .pipe(data(loadJson))
    .pipe(jade())
    .pipe(gulp.dest('./public/'))
    .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
