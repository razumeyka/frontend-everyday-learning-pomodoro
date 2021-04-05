'use strict';

const gulp = require('gulp'),
	watch = require('gulp-watch'),
	sourcemaps = require('gulp-sourcemaps'),
	uglify = require('gulp-uglify'),
	cleanCSS = require('gulp-clean-css'),
	browserSync = require("browser-sync"),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
//	rename = require("gulp-rename"),
	fileinclude = require('gulp-file-include');
	// reload = browserSync.reload;
	

var path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        images: 'build/images/',
        fonts: 'build/fonts/'
    },
    src: { 
        html: 'src/*.html', 
        js: 'src/js/*.js',
        style: 'src/css/main.sass',
        images: 'src/images/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        css: 'src/css/**/*.*ss',
        images: 'src/images/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './build'
};
var config = {
	server: {
		baseDir: "./build"
	},
	tunnel: true,
	host: 'localhost',
	port: 80,
	logPrefix: "razum"
};

gulp.task('html:build', function () {
    return gulp.src(path.src.html) 
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file'
		}))
        .pipe(gulp.dest(path.build.html));
        //.pipe(reload({stream: true})); //И перезагрузим наш сервер для обновлений
});

gulp.task('js:build', function () {
	return gulp.src(path.src.js)
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file'
		}))
		.pipe(sourcemaps.init())
//        .pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(path.build.js));
       // .pipe(reload({stream: true})); //И перезагрузим сервер
});

gulp.task('js:buildnosource', function () {
	return gulp.src(path.src.js)
		.pipe(fileinclude({
			prefix: '@@',
			basepath: '@file'
		}))
		.pipe(uglify())
		.pipe(gulp.dest(path.build.js));
});

gulp.task('css:build', function(){
	return gulp.src(path.src.style)
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('build/css'));
		//.pipe(reload({stream: true})); //И перезагрузим сервер
});

gulp.task('css:buildnosource', function () {
	return gulp.src(path.src.style)
		.pipe(sass())
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(gulp.dest('build/css'));
});

gulp.task('static:build', function() {
	gulp.src(path.src.fonts).pipe(gulp.dest(path.build.fonts))
	return gulp.src(path.src.images).pipe(gulp.dest(path.build.images))
});

gulp.task('build',gulp.series('html:build', 'js:build','css:build', 'static:build'));
gulp.task('deploy',gulp.series('html:build', 'js:buildnosource','css:buildnosource', 'static:build'));

gulp.task('watch', function () {
	watch([path.watch.html], gulp.series('html:build'))
	watch([path.watch.css], gulp.series('css:build'))
	watch([path.watch.js], gulp.series('js:build'))
	watch([path.watch.fonts], gulp.series('static:build'))
	watch([path.watch.images], gulp.series('static:build'))
});

gulp.task('webserver', function () {
	browserSync(config);
});

gulp.task('default', gulp.series('build',gulp.parallel('webserver', 'watch')));