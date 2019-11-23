var gulp = require('gulp');

var pug = require('gulp-pug');

var sass = require('gulp-sass');

var concat = require('gulp-concat');

var autoprefixer = require('gulp-autoprefixer');

var minify = require('gulp-minify');

var reload = require('gulp-livereload');

var wait = require('gulp-wait');


//  HTML Task
gulp.task('HTML5', function () {

    return gulp.src('develop/html/*.pug')       //  [1] get the source
        .pipe(pug({pretty: true}))              //  [2] convert pug to html
        .pipe(gulp.dest('dist'))                //  [3] Copy files to dist folder
        .pipe(reload())
});


//  CSS Task
gulp.task('CSS3', function () {

    return gulp.src(['develop/css/**/*.css', 'develop/css/**/*.scss'])
        .pipe(wait(500))
        .pipe(sass({outputStyle: 'compressed'})).on('error', sass.logError)
        .pipe(autoprefixer('last 2 versions'))
        .pipe(concat('master.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(reload())
});


//  JS Task
gulp.task('JS', function () {

    return gulp.src('develop/js/*.js')
        .pipe(concat('master.js'))
        .pipe(minify())
        .pipe(gulp.dest('dist/js'))
        .pipe(reload())

});


//  watch task
gulp.task('monitor', function () {

    require('./server.js');

    reload.listen();

    gulp.watch("develop/html/**/*.pug", ["HTML5"]);

    gulp.watch(['develop/css/**/*.scss', 'develop/css/**/*.css'], ["CSS3"]);

    gulp.watch("develop/js/*.js", ["JS"]);
});