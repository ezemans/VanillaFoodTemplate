var gulp = require('gulp');
var webserver = require('gulp-webserver');
var stylus = require('gulp-stylus');
var nib = require('nib');
var minify = require('gulp-minify-css');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var smoosher = require('gulp-smoosher');
var imageop = require('gulp-image-optimization');

var config = {
	styles:{
		main: './src/stylus/styles.styl',
		watch: './src/stylus/**/*.styl',
		output: './build/css'
	},
	html:{
		watch: './build/*.html',
	},
	scripts:{
		main: './src/javascript/main.js',
		watch: './src/javascript/**/*.js',
		output: './build/js'
	},
	images:{
		watch: ['./build/img/*.png', './build/img/*.jpg'],
		output: './dist/img/',
	}
}

gulp.task('server', function(){
	gulp.src('./build')
		.pipe(webserver({
			hots: '0.0.0.0',
			port: '8080',
			livereload: true,
		}))
});

gulp.task('images', function(){
	gulp.src(config.images.watch)
		.pipe(imageop({
			optimizationLevel: '5',
			progressive: 'true',
			interlaced:'true' 
		}))
		.pipe(gulp.dest(config.images.output))
})

gulp.task('build:css', function(){
	gulp.src(config.styles.main)
		.pipe(stylus({
			use: nib,
		}))
		.pipe(minify())
		.pipe(gulp.dest(config.styles.output))
})

gulp.task('build:js', function(){
	return browserify(config.scripts.main)
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(buffer())
		.pipe(uglify())
		.pipe(gulp.dest(config.scripts.output));
})
gulp.task('inline', function(){
	gulp.src('./build/index.html')
		.pipe(smoosher())
		.pipe(gulp.dest('./dist'))
})
gulp.task('watch', function(){
	gulp.watch(config.styles.watch, ['build:css']),
	gulp.watch(config.scripts.watch, ['build:js']),
	gulp.watch(config.images.watch, ['images']),
	gulp.watch(config.html.watch, ['build'])
})

gulp.task('build', ['build:css', 'build:js', 'images', 'inline'])

gulp.task('default', ['server','watch', 'build'])