var gulp         = require('gulp')
  , sass         = require('gulp-sass')
  , autoprefixer = require('gulp-autoprefixer')
  , eslint       = require('gulp-eslint')
  , browserSync  = require('browser-sync').create()

var reload = browserSync.reload

gulp.task('lint', function () {
  // ESLint ignores files with "node_modules" paths.
  // So, it's best to have gulp ignore the directory as well.
  // Also, Be sure to return the stream from the task;
  // Otherwise, the task may end before the stream has finished.
  return gulp.src(['**/*.js','!node_modules/**','!app/bower_components/**'])
    // eslint() attaches the lint output to the "eslint" property
    // of the file object so it can be used by other modules.
    .pipe(eslint())
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format())
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    .pipe(eslint.failAfterError())
})

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
