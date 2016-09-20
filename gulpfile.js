const gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    ts = require('gulp-typescript'),
    inject = require('gulp-inject'),
    del = require('del'),
    concat = require('gulp-concat'),
    changed = require('gulp-changed'),
		rollup = require('rollup-stream'),
		source = require('vinyl-source-stream'),
		buffer = require('vinyl-buffer'),
		uglify = require('gulp-uglify'),
    mainBowerFiles = require('main-bower-files')
		rename = require('gulp-rename');


const tsPath = 'src/**/*.ts',
  scssPath = 'src/styles/**/*.scss',
	cssPath = 'build/styles',
  destPath = 'build';

gulp.task('build-scss', function() {
    return gulp.src(scssPath, {base: 'src/styles'})
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(sourcemaps.write())
      //.pipe(gulp.dest(cssPath))
			//.pipe(uglify())
			//.pipe(rename({extname: '.min.css'}))
			.pipe(gulp.dest(cssPath));
});

var tsGlob = [
  'src/**/*.ts',
  '!(node_modules/* | bower_components/* | typings/* )'
];

var tsProjectFrontend = ts.createProject({
      "module": "system",
      "moduleResolution": "node",
      "removeComments": false,
      "target": "ES6",
      "format": "register",
      "emitDecoratorMetadata": true,
      "experimentalDecorators": true,
      "noImplicitAny": false,
      "noEmitOnError": true
});

var tsProjectBackend = ts.createProject({
      "module": "commonjs",
      "moduleResolution": "node",
      "removeComments": false,
      "target": "ES6",
      "format": "register",
      "emitDecoratorMetadata": true,
      "experimentalDecorators": true,
      "noImplicitAny": false,
      "noEmitOnError": true
});


gulp.task('build-ts-frontend', function() {
  return gulp.src(['src/**/*.ts', '!src/electron-app/**/*.ts'])
    .pipe(sourcemaps.init())
    .pipe(ts(tsProjectFrontend))
    .pipe(sourcemaps.write())
    //.pipe(gulp.dest('build'))
		//.pipe(uglify())
		//.pipe(rename({extname: '.min.js'}))
		.pipe(gulp.dest('build'));
});

gulp.task('build-ts-backend', function() {
  return gulp.src(['src/electron-app/**/*.ts'])
    .pipe(sourcemaps.init())
    .pipe(ts(tsProjectBackend))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/electron-app'));
});


gulp.task('build-dts', function() {
  var tsResult = gulp.src('node_modules/nosqlite/lib/nosqlite.js')
    .pipe(ts( {declaration: true, noExternalResolve: true} ));
  return tsResult.dts.pipe(gulp.dest('./typings'));
});

gulp.task('watch', function() {
  gulp.watch([scssPath], ['build-scss'] );
  gulp.watch([tsPath], ['build-ts-frontend', 'build-ts-backend'] );
  gulp.watch(['src/**/*.{svg,png,htm,html,js,css,otf,ttf,woff,sfd}'], ['copyfiles']);
});

gulp.task('clear-dependencies', function(cb) {
	var success = del('build/dependencies/**/*');
	//console.log('dependencies cleared');
  return cb();
});



var npmFiles = ['levelup/lib/*.js', 'leveldown/leveldown.js',
	'leveldown/build/Release/*.*', 'leveldown-sublevel/index.js'];

gulp.task('copy-npm-dependencies', ['clear-dependencies'], function() {
  return gulp.src(['node_modules/systemjs/dist/**/*.js'], {base: './node_modules'} )
    .pipe(gulp.dest('build/dependencies'));
});

gulp.task('copy-bower-dependencies', ['clear-dependencies'], function() {
	var files = ['bower_components/{jquery,moment}/**/*.min.js'];
	return gulp.src(files, {base: './bower_components'})
		.pipe(gulp.dest('build/dependencies'));
});

gulp.task('copy-fonts', ['clear-dependencies'], function() {
	var files = ['bower_components/font-awesome/**/*.{eot,svg,ttf,woff,woff2,otf}'];
	return gulp.src(files)
		.pipe(gulp.dest('build'));
});

gulp.task('copy-ng2', ['clear-dependencies'], function() {
  var files = ['./node_modules/es6-shim/**/*.js', './node_modules/zone.js/dist/**/*.js',
		'./node_modules/rxjs/**/*.js', './node_modules/reflect-metadata/**/*.js',
		'./node_modules/@angular/**/*.umd.js', '!(**/src/**)'
	];
  return gulp.src(files, {base: './node_modules'})
    //.pipe(concat('index.js'))
    .pipe(gulp.dest('build/dependencies'));
});

gulp.task('copy-dependencies', ['clear-dependencies', 'copy-npm-dependencies',
	'copy-bower-dependencies', 'copy-ng2', 'copy-foundation', 'copy-fonts']);

gulp.task('copy-foundation', ['clear-dependencies'], function() {
  return gulp.src(['bower_components/foundation-apps/**/*.{svg}'])
         .pipe(gulp.dest('build/dependencies/foundation'));
});

gulp.task('build', ['build-scss', 'build-ts-frontend', 'build-ts-backend', 'copyfiles', 'copy-dependencies']); //'build-main'

gulp.task('default', ['watch']);

gulp.task('copyfiles', function() {
    gulp.src('src/**/*.{svg,png,htm,html,js,css,otf,ttf,woff,sfd}')
    .pipe(gulp.dest('build'));
});

gulp.task('clean', function() {
  return del('build/**/*');
});
