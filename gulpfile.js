const gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    ts = require('gulp-typescript'),
    del = require('del');
    //concat = require('gulp-concat'),
    //changed = require('gulp-changed'),
		//uglify = require('gulp-uglify'),
    //mainBowerFiles = require('main-bower-files'),
    // gulpWebpack = require('gulp-webpack'),
    // webpack = require('webpack'),
		//rename = require('gulp-rename');


const tsPath = 'src/**/*.ts',
  webPath = 'src/notes/**/*.ts',
  electronPath = 'src/electron-app/**/*.ts'
  staticPath = 'src/**/*.{svg,png,htm,html,js,css,otf,ttf,woff,sfd}',
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
      "declaration": false,
      "module": "amd",
      "moduleResolution": "node",
      "removeComments": false,
      "target": "ES6",
      "emitDecoratorMetadata": true,
      "experimentalDecorators": true,
      "noImplicitAny": false,
      "noEmitOnError": true,
      "lib": ["ES6", "DOM", "DOM.Iterable", "ScriptHost"],
      "rootDir": "./src",
      "outDir": "./build",
      //"typeRoots": ["./node_modules/@types"],
      "baseUrl": ".",
      "paths": {
          "web-app": ["./src/notes"],
          "electron-app": ["./src/electron-app"]
      }
});

var tsProjectBackend = ts.createProject({
      "module": "commonjs",
      "moduleResolution": "node",
      "removeComments": false,
      "target": "ES2015",
      "emitDecoratorMetadata": true,
      "experimentalDecorators": true,
      "noImplicitAny": false,
      "noEmitOnError": true
});


gulp.task('build-webApp', function() {
  return gulp.src(['src/notes/**/*.ts'])
    .pipe(sourcemaps.init())
    .pipe(tsProjectFrontend())
    .pipe(sourcemaps.write())
		.pipe(gulp.dest('build/notes'));
    //.pipe(gulp.dest('build'))
		//.pipe(uglify())
		//.pipe(rename({extname: '.min.js'}))
});

gulp.task('build-electronApp', function() {
  return gulp.src(['src/electron-app/**/*.ts'])
    .pipe(sourcemaps.init())
    .pipe(tsProjectBackend())
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
  gulp.watch([webPath], ['build-electronApp'] );
  gulp.watch([electronPath], ['build-webApp'] );
  gulp.watch([staticPath], ['copyFiles']);
});

gulp.task('clear-dependencies', function(cb) {
	var success = del('build/dependencies/**/*');
  return cb();
});



var npmFiles2 = [
  'levelup/lib/*.js', 
  'leveldown/leveldown.js',
	'leveldown/build/Release/*.*', 
  'systemjs/dist/**/*.js',
  'level-sublevel/index.js'];

gulp.task('copy-npm-dependencies', ['clear-dependencies'], function() {
  var files = [
    'node_modules/{systemjs,jquery,moment,levelup,electron}/{dist,build,lib}/**/*.js',
    'node_modules/electron/**/*.js',
    'node_modules/es6-shim/**/*.js',
    'node_modules/zone.js/dist/**/*.js',
    'node_modules/rxjs/**/*.js',
    'node_modules/reflect-metadata/**/*.js',
    'node_modules/@angular/**/*.umd.js',    
    'node_modules/ui-router-core/**/*.js',
    'node_modules/ui-router-ng2/_bundles/**/*.js',
    'node_modules/{foundation-apps,font-awesome}/**/*.{svg,png,htm,html,js,css,otf,ttf,woff,sfd}',
    '!(**/src/**)'
  ];
  return gulp.src(files, {base: './node_modules'} )
    .pipe(gulp.dest('build/dependencies'));
});


gulp.task('copy-dependencies', ['clear-dependencies', 'copy-npm-dependencies']);

gulp.task('build', ['clean', 'build-all']);

gulp.task('build', ['build-scss', 'build-webApp', 'build-electronApp', 'copy-dependencies', 'copyFiles']); //'build-main'

gulp.task('default', ['watch']);

gulp.task('copyFiles', function() {
    gulp.src(staticPath)
    .pipe(gulp.dest('build'));
});

gulp.task('clean', function() {
  return del('build/**/*');
});


// gulp.task('webpack-webapp', function() {
//   var entryFile = './src/notes/main.ts';
//   var outputFileName = 'build/notes.js'
//   return gulp.src('./src/notes/main.ts')
//     .pipe( gulpWebpack(require('./webpack-config-webapp.js'), webpack))
//     .pipe(gulp.dest('build/'));
// });

// gulp.task('webpack-electron', function() {
//   var entryFile = 'src/ElectronMain.js';
//   var outputFileName = 'build/electron-app.js'
//   return gulp.src('./src/notes/main.ts')
//     .pipe( gulpWebpack(require('webpack-config-electron.js'), webpack))
//     .pipe(gulp.dest('build/'));
// });
