var gulp         = require('gulp')
  , sass         = require('gulp-sass')
  , autoprefixer = require('gulp-autoprefixer')
  , concat       = require('gulp-concat')
  , uglify       = require('gulp-uglify')
  , browserSync  = require('browser-sync').create()
  , reload       = browserSync.reload
  , eslint       = require('gulp-eslint')
  , Server       = require('karma').Server

// static server + linting and recompiling and reloading after any changes
gulp.task('default', ['copy-html', 'styles', 'lint', 'test'], function () {

  browserSync.init({
    server: './dist',
    port: 3000
  })

  gulp.watch(['app/**/*.html'], reload)
  gulp.watch(['app/**/*.{scss,css}'], ['styles', reload])
    .on('change', watchLogger(['styles']))
  gulp.watch(['app/**/*.js'], ['lint', reload])
    .on('change', watchLogger(['lint']))
})

// prepare files for distribution
gulp.task('dist', [
  'copy-html',
  'styles',
  'lint',
  'scripts-dist'
])

// sass => css with autoprefixes
gulp.task('styles', function () {
  gulp.src('./app/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest('./app/css'))   // send to production
    .pipe(gulp.dest('./dist/css'))  // send to distribution
})

// lint all .js files in the project
gulp.task('lint', function () {
  return gulp.src(['app/**/*.js', 'test/**/*.js', '!node_modules/**','!app/bower_components/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})

// starts a karma to run Jasmine tests (this will keep running and updating)
gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/test/karma.conf.js'
  }, done).start()
})

// copy html from production to distribution
gulp.task('copy-html', function() {
  gulp.src('./app/index.html')
    .pipe(gulp.dest('./dist'))
  gulp.src('./app/partials/*')
    .pipe(gulp.dest('./dist/partials'))
})

gulp.task('scripts', function () {
  gulp.src('app/js/**/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('dist/js'))
})

gulp.task('scripts-dist', function () {
  gulp.src('app/js/**/*.js')
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
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
