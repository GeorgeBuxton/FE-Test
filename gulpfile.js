var gulp = require('gulp'),
	gutil = require('gulp-util'),
	browserify = require('gulp-browserify'),
	compass = require('gulp-compass'),
	concat = require('gulp-concat');

var jsSources = [
	'components/scripts/main.js'
];

var sassSources = ['components/sass/style.scss'];

gulp.task('js', function() {
	gulp.src(jsSources)
		.pipe(concat('main.js'))
		.pipe(browserify())
		.pipe(gulp.dest('builds/development/js'))
});

gulp.task('sass', function() {
	gulp.src(sassSources)
		.pipe(compass({
			sass: 'components/sass',
			image: 'builds/development/images',
			style: 'expanded'
		}))
		.pipe(gulp.dest('builds/development/css'))
});

gulp.task('watch', function(){
	gulp.watch(jsSources, ['js']);
	gulp.watch(sassSources, ['sass']);
});

gulp.task('default', ['js', 'sass']);