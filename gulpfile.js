const { src, dest, parallel, series, watch } = require('gulp')
const browserSync = require('browser-sync').create()
const include = require('gulp-file-include')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const cleancss = require('gulp-clean-css')
const rename = require('gulp-rename')
const webpack = require('webpack')
const webpackStream = require('webpack-stream')
const imagemin = require('gulp-imagemin')
const newer = require('gulp-newer')
const del = require('del')
const webpackConfig = require('./webpack.config.js')

function browsersync() {
  browserSync.init({
    server: { baseDir: 'dist/' },
    port: 4000,
    notify: true
  })
}

function views() {
  return src('src/*.html')
    .pipe(include({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(dest('dist/'))
    .pipe(browserSync.stream())
}

function styles() {
  return src('src/scss/main.scss')
    .pipe(sass())
    .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
    .pipe(cleancss({ level: { 1: { specialComments: 0 } }/*  format: 'beautify' */ }))
    .pipe(rename('style.min.css'))
    .pipe(dest('dist/css/'))
    .pipe(browserSync.stream())
}

function scripts() {
  return src('src/js/index.js')
    .pipe(webpackStream(webpackConfig), webpack)
    .pipe(rename('app.min.js'))
    .pipe(dest('dist/js/'))
    .pipe(browserSync.stream())
}

function images() {
  return src('src/images/**/*')
    .pipe(newer('dist/images/'))
    .pipe(imagemin())
    .pipe(dest('dist/images/'))
}

function gzip() {
  return src('src/.htaccess')
    .pipe(dest('dist'))
}

function cleandist() {
  return del('dist', { force: true })
}

function startwatch() {
  watch([
    'src/components/**/*.html',
    'src/*.html'
  ], views).on('change', browserSync.reload)
  watch([
    'src/components/**/*.scss',
    'src/scss/**/*.scss'
  ], styles)
  watch([
    'src/components/**/*.js',
    'src/js/**/*.js'
  ], scripts)
  watch('src/images/**/*', images)
}

exports.clean = cleandist
exports.build = series(cleandist, views, styles, scripts, images, gzip)
exports.default = parallel(views, styles, scripts, images, browsersync, startwatch)
