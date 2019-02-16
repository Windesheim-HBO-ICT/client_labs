const gulp = require('gulp');
const clean_css = require('gulp-clean-css');
const auto_prefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const {src, dest} = require('gulp');
const { series, parallel } = require('gulp');
const browserSync = require('browser-sync').create();

// gulp.task('build', function (done) {
//     console.log('Running build task')
//     done()
// })

gulp.task('default', function (done) {
    console.log('Running default task')
    done()
})

gulp.task('promise-taak', function () {

    return new Promise(function (resolve, reject) {

        resolve('promise-taak is done')

    })

})

// gulp.task('read-html-files', function () {
//
//     return src('./html/**/*.html')
//         .pipe(dest('dist'))
//
// })
//
// gulp.task('move-css', function () {
//
//     return src('./css/**/*.css')
//         .pipe(clean_css({compatibility: 'ie9'}))
//         .pipe(auto_prefixer('last 2 version', 'safari 5', 'ie 9'))
//         .pipe(concat('style.min.css'))
//         .pipe(gulp.dest('./dist'));
//
// })

const html = function () {

    return src('./html/**/*.html')
        .pipe(dest('dist'))

}

const css = function () {

    return src('./css/**/*.css')
        .pipe(clean_css({compatibility: 'ie9'}))
        .pipe(auto_prefixer('last 2 version', 'safari 5', 'ie 9'))
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.stream());

}

gulp.task('serve', function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("./css/**.css", series(css))
    gulp.watch("./html/**/*.html", series(html))
    gulp.watch("dist/**/*.html").on('change', browserSync.reload);
});

exports.build = parallel(css, html);