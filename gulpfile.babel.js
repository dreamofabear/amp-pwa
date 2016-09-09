'use strict';

import del from 'del';
import eslint from 'gulp-eslint';
import gulp from 'gulp';
import gutil from 'gulp-util';
import path from 'path';
import sequence from 'run-sequence';
import {spawn} from 'child_process';
import swPrecache from 'sw-precache';
import uglify from 'gulp-uglify';
import webpack from 'webpack-stream';

const SRC_DIR = 'src';
const BUILD_DIR = 'dist';
const THIRD_PARTY_MODULES = ['react', 'react-dom'];

gulp.task('clean', () => {
  return del(BUILD_DIR);
});

gulp.task('webpack', () => {
  const config = require('./webpack.config.js');
  return gulp.src(`${SRC_DIR}/entry.js`)
    .pipe(webpack(config))
    .pipe(gulp.dest(BUILD_DIR));
});

gulp.task('copy-static', () => {
  return gulp.src(`${SRC_DIR}/static/**/*`)
    .pipe(gulp.dest(BUILD_DIR));
});

gulp.task('uglify-js', () => {
  return gulp.src(`${BUILD_DIR}/js/**/*`)
    .pipe(uglify())
    .pipe(gulp.dest(`${BUILD_DIR}/js`));
});

gulp.task('lint', () => {
  return gulp.src([`${SRC_DIR}/**/*.{js,jsx}`, '*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('service-worker', cb => {
  swPrecache.write(path.join(BUILD_DIR, 'service-worker.js'), {
    staticFileGlobs: [
      BUILD_DIR + '/**/*.{js,html,css,png,jpg,jpeg,gif,svg}',
      BUILD_DIR + '/manifest.json'
    ],
    stripPrefix: BUILD_DIR,
  }, cb);
});

gulp.task('build:dev', ['clean'], callback => {
  process.env.NODE_ENV = 'development';
  sequence(
    ['webpack', 'copy-static'],
    'service-worker',
    callback);
});

gulp.task('build:dist', ['clean'], callback => {
  process.env.NODE_ENV = 'development';
  sequence(
    ['webpack', 'copy-static', 'lint'],
    'uglify-js',
    'service-worker',
    callback);
});

gulp.task('serve', callback => {
  spawn('node', ['server.js'], {stdio: 'inherit'})
    .on('error', error => callback(error))
    .on('exit', error => callback(error));
});

gulp.task('default', callback => {
  sequence('build:dev', 'serve', callback);
});

process.on('SIGINT', process.exit);