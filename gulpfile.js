var gulp = require('gulp')
var sass = require('gulp-sass')
var autoprefixer = require('gulp-autoprefixer')

/**
 * @param {String[]} - names of tasks that will be run
 * @returns {Function} - returns a function that takes the gulp event object and logs info
 **/
var watchLogger = function (taskNames) {
  return function (event) {
    console.log('File', event.path, 'was', event.type,
                ', running tasks:', taskNames.join(', ') + '...')
  }
}

gulp.task('default', function () {
  gulp.watch('./app/sass/**/*.scss', ['styles'])
    .on('change', watchLogger(['styles', 'frying', 'baking']))
})

gulp.task('styles', function () {
  gulp.src('./app/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest('./app/css'))
})
