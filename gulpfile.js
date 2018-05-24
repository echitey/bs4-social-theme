// DEFINING THE REQUIRED VARS
const gulp = require('gulp');
const browserSync  = require('browser-sync').create();
const sass = require('gulp-sass');


// COMPILE SASS & INJECT INTO BROWSER
gulp.task('sass', function () {
  return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
          .pipe(sass())
          .pipe(gulp.dest("src/css"))
          .pipe(browserSync.stream());
});


//MOVE JS FILES TO src/js
gulp.task('js', function () {
  return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js',
                   'node_modules/jquery/dist/jquery.min.js',
                   'node_modules/popper.js/dist/umd/popper.min.js'])
             .pipe(gulp.dest("src/js"))
             .pipe(browserSync.stream());
});


// WATCH SASS AND SERVE
gulp.task('serve',['sass'], function () {
  browserSync.init({
    server: "./src"
  });

  gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], ['sass']);
  gulp.watch("src/*.html").on('change', browserSync.reload);
});


// MOVE FONT AWESOME FOLDER TO src
gulp.task('fonts', function () {
  return gulp.src('node_modules/font-awesome/fonts/*')
             .pipe(gulp.dest("src/fonts"));
});


// MOVE FONT AWESOME CSS TO src/css
gulp.task('fa', function () {
  return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
             .pipe(gulp.dest("src/css"));
});



// CREATING GULP DEFAULT TASK
gulp.task('default', ['js', 'serve', 'fa', 'fonts']);
