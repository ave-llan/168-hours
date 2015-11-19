var gulp         = require('gulp')
  , sass         = require('gulp-sass')
  , autoprefixer = require('gulp-autoprefixer')
  , eslint       = require('gulp-eslint')
  , browserSync  = require('browser-sync').create()
  , reload       = browserSync.reload

// static server + linting and recompiling and reloading after any changes
gulp.task('default', ['styles', 'lint'], function () {

  browserSync.init({
    server: './app',
    port: 3000
  })

  gulp.watch(['app/**/*.html'], reload)
  gulp.watch(['app/**/*.{scss,css}'], ['styles', reload])
    .on('change', watchLogger(['styles']))
  gulp.watch(['app/**/*.js'], ['lint', reload])
    .on('change', watchLogger(['lint']))
})

// lint all .js files in the project
gulp.task('lint', function () {
  return gulp.src(['**/*.js','!node_modules/**','!app/bower_components/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
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
    console.log('File', event.path, 'was', event.type,           // eslint-disable-line no-console
                ', running tasks:', taskNames.join(', ') + '...')
  }
}
