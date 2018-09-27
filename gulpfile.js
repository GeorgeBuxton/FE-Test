var gulp = require('gulp'),
	gutil = require('gulp-util'),
	browserify = require('gulp-browserify'),
	compass = require('gulp-compass'),
	gulpif = require('gulp-if'),
	cleanCSS = require('gulp-clean-css'),
	uglify = require('gulp-uglify'),
	htmlmin = require('gulp-htmlmin'),
	connect = require('gulp-connect'),
	concat = require('gulp-concat');

var env, 
	jsSources,
	sassSources,
	htmlSources,
	imageSources,
	sassStyle,
	outputDir;

env = process.env.NODE_ENV || 'development';

if (env==='development') {
	outputDir = 'builds/development/';
	sassStyle = 'expanded';
} else {
	outputDir = 'builds/production/';
	sassStyle = 'compressed';
}


jsSources = [
	'components/scripts/main.js'
];

sassSources = ['components/sass/style.scss'];

htmlSources = ['builds/development/*.html'];

imageSources = ['builds/development/images/*'];

gulp.task('js', function() {
	gulp.src(jsSources)
		.pipe(concat('main.js'))
		.pipe(browserify())
		.pipe(gulpif(env === 'production', uglify()))
		.pipe(gulp.dest(outputDir + 'js'))
		.pipe(connect.reload())
});

gulp.task('html', function() {
	gulp.src(htmlSources)
		.pipe(gulpif(env === 'production', htmlmin({ collapseWhitespace: true })))
		.pipe(gulpif(env === 'production', gulp.dest(outputDir)))
		.pipe(connect.reload())
});

gulp.task('images', function() {
	gulp.src(imageSources)
		.pipe(gulpif(env === 'production', gulp.dest(outputDir + /images/ )))
		.pipe(connect.reload())
});

gulp.task('sass', function() {
	gulp.src(sassSources)
		.pipe(compass({
			sass: 'components/sass',
			image: outputDir + 'images',
			style: sassStyle
		}))
		.pipe(gulpif(env === 'production', cleanCSS({compatibility: 'ie8'})))
		.pipe(gulp.dest(outputDir + 'css'))
		.pipe(connect.reload())
});

gulp.task('watch', function(){
	gulp.watch(jsSources, ['js']);
	gulp.watch(sassSources, ['sass']);
	gulp.watch(htmlSources, ['html']);
});

gulp.task('connect', function() {
	connect.server({
		root: outputDir,
		livereload: true
	});
});

gulp.task('default', ['js', 'sass', 'html', 'images', 'connect', 'watch']);
