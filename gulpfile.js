'use strict';

// System requirements:
var gulp 			= require('gulp');
var sass 			= require('gulp-sass');
var minifyCSS       = require('gulp-csso');
var sourcemaps 		= require('gulp-sourcemaps');
var autoprefixer 	= require('gulp-autoprefixer');
var concat          = require('gulp-concat');
var uglify          = require('gulp-uglify');

// Output files: 
var css_output 		= './assets/css';
var js_output       = './assets/js';

// Lê o conteúdo da estrutura do SCSS, gera auto-prefixer e source-maps, minifica o código e devolve CSS 
gulp.task('sass', function () {
  return gulp.src('./assets/sass/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(minifyCSS())
    .pipe(gulp.dest(css_output));
});

// Escuta alterações SCSS em toda estrutura de pastas/sub-pastas e invoca a task sass.
gulp.task('sass:watch', function () {
	gulp.watch('./assets/sass/**/*.scss', ['sass'])
	.on('change', function(event) {
		console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
	});
});

// JS files: 
var jquery_3    = './assets/scripts/jquery.js';
var popper      = './assets/scripts/popper.js';
var tether      = './assets/scripts/tether.js';
var bootstrap_4 = './node_modules/bootstrap/dist/js/bootstrap.js';
var effects     = './assets/scripts/effects.js';

// Cria um único arquivo JS minificado
gulp.task('scripts', function() {
  gulp.src([ 
        jquery_3,
        popper,
        tether,
        bootstrap_4,
        effects
    ])
    .pipe(concat('script.js'))
    .pipe(uglify())
    .pipe(gulp.dest(js_output));
});