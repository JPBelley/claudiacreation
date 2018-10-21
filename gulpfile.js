// load the require modules
let gulp = require('gulp');
let sass = require('gulp-sass');
let uglify = require('gulp-uglify');
let concat = require('gulp-concat');
let autoprefixer = require('gulp-autoprefixer');
let browserSync = require('browser-sync').create();
let imagemin = require('gulp-imagemin');
let pages = require('gulp-gh-pages');
let plumber      = require('gulp-plumber');
let sourcemaps = require('gulp-sourcemaps');
// À compléter
// let babel = require("gulp-babel");

// File paths
let SCRIPTS_PATH = ['src/js/masonry.pkgd.min.js', 'src/imagesloaded.pkgd.js', 'src/js/**/*.js'];
let CSS_PATH = 'src/scss/**/*.scss';

// Translate SASS to CSS
gulp.task('sass', function(){
  return gulp.src(CSS_PATH)
    .pipe(plumber(function(err) {
      console.log('Style task error');
      console.log(err);
      this.emit('end');
    })) // Keep gulp watch running even if the an error
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed'
    })) // Converts Sass to CSS with gulp-sass
    .pipe(autoprefixer())
    .pipe(concat('style.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css/'))
});

// Javascript
gulp.task('scripts', function(){
  return gulp.src(SCRIPTS_PATH)
    .pipe(uglify())
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/js'))
});

/* HTML
**************************/
gulp.task('html', function() {
	return gulp.src('src/**/*.html')
		.pipe(gulp.dest('./dist/'));
});

/* Image minification
**************************/
gulp.task('imagemin', function(){
  var img_src = 'src/img/*';
  var img_dest = './dist/img/';
  return gulp.src(img_src)
  .pipe(imagemin())
  .pipe(gulp.dest(img_dest));
});

/** Watcher to rerun gulp on save
**************************/
gulp.task('default', ['scripts', 'sass', 'imagemin', 'html'], function(){
  // gulp.watch(CSS_PATH, ['sass']);
  // Other watchers
  // gulp.watch('dist/*.html');
  // gulp.watch(SCRIPTS_PATH, ['scripts']);
  console.log('******** Default task done ********');

})

/** Watcher to rerun gulp on save
**************************/
gulp.task('watch', ['browserSync', 'scripts', 'sass', 'imagemin', 'html'], function(){
  gulp.watch(CSS_PATH, ['sass'], browserSync.reload);
  // Other watchers
  gulp.watch('src/*.html', ['html'], browserSync.reload);
  gulp.watch(SCRIPTS_PATH, ['scripts'], browserSync.reload);
})

/** Setting up a web server for auto browser reload
**************************/
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'dist'
    },
  })
})

/** Push build to gh-pages
**************************/
gulp.task('deploy', function () {
  return gulp.src("./dist/**/*")
    .pipe(pages());
});
