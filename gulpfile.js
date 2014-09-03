var gulp = require('gulp'),
    less = require('gulp-less'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    minifyCss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    concat =  require('gulp-concat'),
    livereload = require('gulp-livereload');

// config to hold the path files
var paths = {
  server: [],
  client: ['./public/js/**/*.js', '!./public/js/**/*.min.js']
};

// Lint the javascript client files
gulp.task('lintclient', function () {
  gulp
    .src(paths.client)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
});

// Uglify the client/frontend javascript files
gulp.task('uglify', function () {
  gulp
    .src(paths.client)
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./public/js'))
});

// Concat the built javascript files from the uglify task with the vendor/lib javascript files into one file
// Let's save the users some bandwith

//gulp.task('concatJs', function () {
//  gulp
//    .src(['./public/vendor/jquery/dist/jquery.min.js', './public/vendor/bootstrap/dist/js/bootstrap.min.js', './public/js/main.min.js'])
//    .pipe(concat('app.min.js'))
//    .pipe(gulp.dest('./public/js'));
//});

// Preprocess the less files into css files
gulp.task('less', function () {
  gulp
    .src('./public/less/**/goexample.less')
    .pipe(less())
    .pipe(gulp.dest('./public/css'));
});

// Minify the css files to reduce the size of the files
// To avoid this task, import all the other less files into one file
// and rather process that file into a single file and jump straight to concatenation
// You can learn more about this from the twitter bootstrap project
gulp.task('css', function () {
  gulp
    .src(['./public/css/**/*.css', '!./public/css/**/*.min.css'])
    .pipe(minifyCss())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./public/css'));
});

// Concat all the css files
//gulp.task('concatCss', function () {
//  gulp
//    .src(['./public/vendor/bootstrap/dist/css/bootstrap.min.css', './public/css/styles.min.css'])
//    .pipe(concat('app.styles.min.css'))
//    .pipe(gulp.dest('./public/css'));
//});

// Watch the various files and runs their respective tasks
gulp.task('watch', function () {
  gulp.watch(paths.server, ['lintserver']);
  gulp.watch(paths.client, ['lintclient']);
  gulp.watch(paths.client, ['buildJs']);
  gulp.watch('./public/less/**/*.less', ['buildCss']);
  gulp
    .src(['./views/**/*.jade', './public/css/**/*.min.css', './public/js/**/*.min.js'])
    .pipe(watch())
    .pipe(livereload());
});

gulp.task('lint', ['lintclient']);
//gulp.task('buildCss', ['less', 'css', 'concatCss']);
gulp.task('buildCss', ['less', 'css']);
//gulp.task('buildJs', ['uglify', 'concatJs']);
gulp.task('buildJs', ['uglify']);
gulp.task('default', ['lint', 'buildCss', 'buildJs', 'watch']);
