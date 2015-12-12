var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var jade = require('gulp-jade');

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'jade'], function() {

  browserSync.init({
    server: "./public"
  });

  gulp.watch("./src/sass/*.sass", ['sass']);
  gulp.watch("./src/**/*.jade", ['jade']);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src("src/sass/main.sass")
    .pipe(sass())
    .pipe(gulp.dest("public/css"))
    .pipe(browserSync.stream());
});

gulp.task('jade', function() {
  var YOUR_LOCALS = {};

  gulp.src('./src/**/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('./public/'))
    .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
