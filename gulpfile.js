const gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    connect = require('gulp-connect'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    del = require('del'),
    gutil = require('gulp-util'),
    rename = require('gulp-rename'),
    minifycss = require('gulp-minify-css'),
    runSequence = require('run-sequence'),
    browserSync = require('browser-sync').create();

const config = {
    srcPath:'source/',
    sassPath:'_sass/',
    mainPath: './',
    libPath: 'lib/',
    assetPath: 'assets/',
    cssPath: 'css/',
    jsPath: 'js/',
    imgPath: 'img/'
};

gulp.task('styles.clean', function (callback) {
    return del(config.mainPath + config.assetPath + config.cssPath + '*.*', callback);
});

gulp.task('styles.scss', function () {
    return sass(config.srcPath + config.sassPath + 'main.scss')
        .on('error', function (error) {
            const lineNumber = (error.lineNumber) ? 'LINE ' + error.lineNumber + ' -- ' : '';
            notify({
                title: 'Task Failed [' + error.plugin + ']',
                message: lineNumber + 'See console.',
                sound: 'Sosumi'
            }).write(error);
            gutil.beep();
            let report = '';
            const chalk = gutil.colors.white.bgRed;
            report += chalk('TASK:') + ' [' + error.plugin + ']\n';
            report += chalk('PROB:') + ' ' + error.message + '\n';
            if (error.lineNumber) {
                report += chalk('LINE:') + ' ' + error.lineNumber + '\n';
            }
            if (error.fileName) {
                report += chalk('FILE:') + ' ' + error.fileName + '\n';
            }
            console.error(report);
            this.emit('end');
        })
        .pipe(autoprefixer('last 2 versions', 'safari 5', 'ie 8', 'ie 9'))
        .pipe(gulp.dest(config.mainPath + config.assetPath + config.cssPath))
        .pipe(browserSync.stream());
});

gulp.task('styles.plaincss', function () {
    return gulp.src([config.bowerPath + 'normalize-css/*.css',
                     config.bowerPath + 'animate.css/animate.min.css', 'src/assets/css/*.css'])
        .pipe(gulp.dest(config.mainPath + config.assetPath + config.cssPath));
});

gulp.task('styles.minifycss', function () {
    return gulp.src([config.mainPath + config.assetPath + config.cssPath + 'normalize.css', config.mainPath + config.assetPath + config.cssPath + 'animate.min.css' , config.mainPath + config.assetPath + config.cssPath + 'main.css'])
        .pipe(concat('style.css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest(config.mainPath + config.assetPath + config.cssPath))
});

gulp.task('styles', function (callback) {
    runSequence(
        'styles.clean',
        'styles.scss',
        'styles.plaincss',
        'styles.minifycss',
        callback);
});

gulp.task('compress', function () {
    return gulp.src('*')
        .pipe(zip('archive.zip'))
        .pipe(gulp.dest('dist'));
});

gulp.task('connect', function() {
  connect.server();
});

gulp.task('watch', function () {
    browserSync.init({
      server: './'
    })
    gulp.watch(config.srcPath + config.sassPath + '**/*.scss', ['styles']);
    gulp.watch('*.html').on('change', browserSync.reload);
});

gulp.task('default', function (callback) {
  runSequence('styles',
              'watch',
              'connect',
              callback);
});
