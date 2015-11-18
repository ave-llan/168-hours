var gulp = require('gulp')
var sass = require('gulp-sass')
var autoprefixer = require('gulp-autoprefixer')
var browserSync = require('browser-sync').create()
// var concat = require('gulp-concat')  // will be used to concat js files

var reload = browserSync.reload

// static server + watching scss/html files
gulp.task('serve', ['styles'], function () {

  browserSync.init({
    server: './app',
    port: 3000
  })

  gulp.watch(['app/**/*.html'], reload)
  gulp.watch(['app/**/*.{scss,css}'], ['styles', reload])
  gulp.watch(['app/**/*.js'], reload)

})

gulp.task('default', function () {
  gulp.watch('./app/sass/**/*.scss', ['styles'])
    .on('change', watchLogger(['styles']))
})

// sass => css with autoprefixes
gulp.task('styles', function () {
  gulp.src('./app/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest('./app/css'))
})


/**
 * @param {String[]} - names of tasks that will be run
 * @returns {Function} - returns a function that takes the gulp event object and logs info
 */
function watchLogger (taskNames) {
  return function (event) {
    console.log('File', event.path, 'was', event.type,
                ', running tasks:', taskNames.join(', ') + '...')
  }
}
