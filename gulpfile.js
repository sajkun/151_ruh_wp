require('events').EventEmitter.prototype._maxListeners = 1000
const { series, parallel } = require('gulp')

var gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	minifycss = require('gulp-clean-css'),
	postcss = require('gulp-postcss'),
	prefixer = require('gulp-autoprefixer'),
	rename = require('gulp-rename'),
	rigger = require('gulp-rigger'),
	uglify = require('gulp-uglify'),
	watch = require('gulp-watch'),
	path = require('path'),
	rimraf = require('rimraf'),
	sass = require('gulp-sass')(require('node-sass')),
	nn = require('node-notifier')

var app_id = '151 ruh tracker'

var version_css = ''
var version_js = ''

var path = {
	build: {
		js: 'assets/script/',
		style: 'assets/css/',
	},
	src: {
		js: 'src/script/*.*',
		style: 'src/sass/*.*',
	},
	watch: {
		js: 'src/script/**/*.js',
		style: 'src/sass/**/*.*',
	},
	clean: 'build',
}

function buildJs(src, dest) {
	let error = false
	return (
		gulp
			.src(src)
			.pipe(
				rigger().on('error', function (err) {
					error = true
					let time = new Date()
					let time_str =
						'[' + time.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1') + ']'
					console.log('\x1b[0m%s\x1b[31m %s \x1b[0m', time_str, err.message)
					nn.notify({
						title: app_id,
						message: err.message,
						wait: true,
						icon: 'error.png',
					})
				})
			)
			// .pipe(
			// 	uglify().on('error', function (err) {
			// 		error = true
			// 		let time = new Date()
			// 		let time_str = '[' + time.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1') + ']'
			// 		console.log('\x1b[0m%s\x1b[31m %s \x1b[0m', time_str, err.message)
			// 		nn.notify({
			// 			title: app_id,
			// 			message: err.message,
			// 			wait: true,
			// 			icon: 'error.png',
			// 		})
			// 	})
			// ) //Сожмем наш js
			.pipe(
				gulp.dest(dest).on('end', function () {
					if (!error) {
						let time = new Date()
						let time_str =
							'[' + time.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1') + ']'
						console.log(
							'\x1b[0m%s\x1b[32m %s \x1b[0m',
							time_str,
							'Скрипты скомпилированны успешно'
						)
						nn.notify({
							title: app_id,
							message: 'Скрипты скомпилированны успешно',
							onLast: true,
							wait: false,
							timeout: 3,
							icon: 'success.png',
						})
					}
				})
			)
			.pipe(rename({ suffix: '.min' + version_js }))
	)
}

gulp.task('build:sass', function () {
	let error = false
	return gulp
		.src(path.src.style)
		.pipe(
			sass({
				includePaths: ['node_modules/normalize-scss/sass', 'node_modules/bootstrap/scss'],
				outputStyle: 'expanded',
			}).on('error', function (err) {
				error = true
				let time = new Date()
				let time_str = '[' + time.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1') + ']'
				console.log('\x1b[0m%s\x1b[31m %s \x1b[0m', time_str, err.message)

				nn.notify({
					title: app_id,
					subtitle: 'Ошибка SCSS',
					message: err.message,
					wait: false,
					icon: 'error.png',
				})

				this.emit('end')
			})
		)
		.pipe(prefixer())
		.pipe(
			gulp.dest(path.build.style).on('end', function (message) {
				if (!error) {
					let time = new Date()
					let time_str =
						'[' + time.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1') + ']'
					console.log(
						'\x1b[0m%s\x1b[32m %s \x1b[0m',
						time_str,
						'Стили изменены успешно (SCSS)'
					)
					nn.notify({
						message: 'Стили изменены успешно (SCSS)',
						onLast: true,
						wait: false,
						title: app_id,
						timeout: 3,
						icon: 'success.png',
					})
				}
			})
		)
		.pipe(rename({ suffix: '.min' + version_css }))
		.pipe(minifycss())
		.pipe(gulp.dest(path.build.style))
})

gulp.task('build:js', function () {
	return buildJs(path.src.js, path.build.js)
})

gulp.task('watch', function () {
	gulp.watch([path.watch.style], gulp.parallel('build:sass'))
	gulp.watch([path.watch.js], gulp.parallel('build:js'))
})

gulp.task('build', gulp.series('build:js', 'build:sass'))

gulp.task('default', series('build', parallel('watch')))
