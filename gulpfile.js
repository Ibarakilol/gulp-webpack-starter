const { src, dest, parallel, series, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const include = require('gulp-file-include');
const htmlmin = require('gulp-htmlmin');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const yargs = require('yargs');
const del = require('del');

const webpackConfig = require('./webpack.config.js'),
  argv = yargs.argv,
  production = !!argv.production;

webpackConfig.mode = production ? 'production' : 'development';
webpackConfig.devtool = production ? false : 'source-map';

function browsersync() {
  browserSync.init({
    server: { baseDir: 'dist/' },
    port: 4000,
    notify: true
  });
}

function views() {
  return src('src/*.html')
  .pipe(include({
    prefix: '@@',
    basepath: '@file'
  }))
  .pipe(htmlmin({
    removeComments: true
  }))
  .pipe(dest('dist/'))
  .pipe(browserSync.stream());
}

function styles() {
  return src('src/scss/main.scss')
  .pipe(webpackStream(webpackConfig, webpack))
  .pipe(dest('dist/assets/'))
  .pipe(browserSync.stream());
}

function scripts() {
  return src('src/js/index.js')
  .pipe(webpackStream(webpackConfig, webpack))
  .pipe(dest('dist/assets/'))
  .pipe(browserSync.stream());
}

function images() {
  return src('src/images/**/*')
  .pipe(newer('dist/images/'))
  .pipe(imagemin())
  .pipe(dest('dist/images/'));
}

function gzip() {
  return src('src/.htaccess')
  .pipe(dest('dist'));
}

function cleandist() {
  return del('dist', { force: true });
}

function startwatch() {
  watch([
    'src/components/**/*.html',
    'src/*.html'
  ], views).on('change', browserSync.reload);
  watch([
    'src/components/**/*.scss',
    'src/scss/**/*.scss'
  ], styles);
  watch([
    'src/components/**/*.js',
    'src/js/**/*.js'
  ], scripts);
  watch('src/images/**/*', images)
}

exports.clean = cleandist
exports.build = series(cleandist, views, styles, scripts, images, gzip);
exports.default = parallel(views, styles, scripts, images, browsersync, startwatch);
