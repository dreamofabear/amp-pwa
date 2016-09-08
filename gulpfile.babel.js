'use strict';

import babelify from 'babelify';
import browserify from 'browserify';
import buffer from 'vinyl-buffer';
import del from 'del';
import eslint from 'gulp-eslint';
import gulp from 'gulp';
import gutil from 'gulp-util';
import path from 'path';
import rev from 'gulp-rev';
import sequence from 'run-sequence';
import source from 'vinyl-source-stream';
import sourcemaps from 'gulp-sourcemaps';
import {spawn} from 'child_process';
import swPrecache from 'sw-precache';
import uglify from 'gulp-uglify';

const SRC_DIR = 'src';
const BUILD_DIR = 'dist';
const THIRD_PARTY_MODULES = ['react', 'react-dom'];

gulp.task('clean', () => {
  return del(BUILD_DIR);
});

gulp.task('bundle-app', () => {
  const b = browserify({
    debug: (process.env.NODE_ENV === 'development'),
    entries: path.join(SRC_DIR, 'entry.js'),
    extensions: ['.js'],
    transform: [babelify]
  });
  THIRD_PARTY_MODULES.forEach(module => b.external(module));
  return b.bundle()
    .on('error', gutil.log)
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(path.join(BUILD_DIR, '/js')));
});

gulp.task('bundle-third-party', () => {
  const b = browserify();
  THIRD_PARTY_MODULES.forEach(module => b.require(module));
  return b.bundle()
    .on('error', gutil.log)
    .pipe(source('third-party.js'))
    .pipe(buffer())
    .pipe(gulp.dest(`${BUILD_DIR}/js`));
});

gulp.task('copy-static', () => {
  return gulp.src(`${SRC_DIR}/static/**/*`)
    .pipe(gulp.dest(BUILD_DIR));
});

// gulp.task('version-assets', () => {
//   return gulp.src(`${BUILD_DIR}/*/*`)
//     .pipe(rev())
//     .pipe(gulp.dest(`${BUILD_DIR}/rev`))
//     .pipe(rev.manifest())
//     .pipe(gulp.dest(BUILD_DIR));
// });

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
  swPrecache.write(path.join(BUILD_DIR, 'sw.js'), {
    staticFileGlobs: [
      BUILD_DIR + '/**/*.{js,html,css,png,jpg,jpeg,gif,svg}',
      //BUILD_DIR + '/manifest.json'
    ],
    stripPrefix: BUILD_DIR,
  }, cb);
});

gulp.task('build:dev', ['clean'], callback => {
  process.env.NODE_ENV = 'development';
  sequence(
    ['bundle-app', 'bundle-third-party', 'copy-static'],
    'service-worker',
    callback);
});

gulp.task('build:dist', ['clean'], callback => {
  process.env.NODE_ENV = 'development';
  sequence(
    ['bundle-app', 'bundle-third-party', 'copy-static', 'lint'],
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