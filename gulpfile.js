const gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    ts = require('gulp-typescript'),
    inject = require('gulp-inject'),
    del = require('del'),
    jspm = require('gulp-jspm'),
    concat = require('gulp-concat'),
    changed = require('gulp-changed'),
		rollup = require('rollup-stream'),
		source = require('vinyl-source-stream'),
		buffer = require('vinyl-buffer'),
    mainBowerFiles = require('main-bower-files');
    //wrap = require('gulp-wrap'),
    //declare = require('gulp-declare'),

   //gutil = require('gulp-util'),
   //jshint = require('gulp-jshint'),
   //uglify = require('gulp-uglify');

const tsPath = 'src/**/*.ts',
  scssPath = 'src/styles/**/*.scss',
	cssPath = 'build/styles',
  destPath = 'build';

gulp.task('build-scss', function() {
    return gulp.src(scssPath, {base: 'src/styles'})
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      //.pipe(uglify())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(cssPath));
});

var tsGlob = [
  'src/**/*.ts',
  '!(node_modules/* | bower_components/* | typings/* | jspm_packages/* )'
]

var tsProject = {
  "compilerOptions": {
      "module": "system",
      "moduleResolution": "node",
      "removeComments": false,
      "target": "ES6",
      //"format": "register",
      "emitDecoratorMetadata": true,
      "experimentalDecorators": true,
      "noImplicitAny": false,
      "noEmitOnError": true
  }
}


gulp.task('compile-ts', function() {
  var tsProject = ts.createProject('tsconfig.json');
  return tsProject.src(['src/**/*.ts'])
    .pipe(changed('build'))
    .pipe(sourcemaps.init())
    .pipe(ts(tsProject))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build'));
});

gulp.task('build-ts', function() {
  var tsProject = ts.createProject('tsconfig.json');
  return tsProject.src(['src/**/*.ts'])
    .pipe(sourcemaps.init())
    .pipe(ts(tsProject))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build'));
});

gulp.task('build-dts', function() {
  var tsResult = gulp.src('node_modules/nosqlite/lib/nosqlite.js')
    .pipe(ts( {declaration: true, noExternalResolve: true} ));
  return tsResult.dts.pipe(gulp.dest('./typings'));
});

//gulp.task('copy-ng2-templates', function() {
  //var tsResult = gulp.src(['src/notes/components/**/*.htm', 'src/notes/components/**/*.html'])
    //.pipe(gulp.dest('build/notes/components'));
//});

/*var proj2 = ts.createProject({
  "compilerOptions": {
      "module": "es6",
      "moduleResolution": "node",
      "target": "ES6"
  }
});

gulp.task('build-main', function() {
  var tsProject = ts.createProject('tsconfig-ElectronMain.json');
  return tsProject.src(['ElectronMain.ts'])
    .pipe(sourcemaps.init())
    .pipe(ts(tsProject))
    //.pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./'));
});*/

gulp.task('watch', function() {
  gulp.watch([scssPath], ['build-scss'] );
  gulp.watch([tsPath], ['compile-ts'] );
  //gulp.watch(['src/notes/components/**/*.html', 'src/notes/components/**/*.htm'], ['copy-ng2-templates']);
  gulp.watch(['src/**/*.{svg,png,htm,html,js,css,otf,ttf,woff,sfd}'], ['copyfiles']);


  //gulp.watch(['Electronmain.ts'], ['build-main']);
});

gulp.task('clear-dependencies', function(cb) {
	var success = del('build/dependencies/**/*');
	console.log('dependencies cleared');
  return cb();
});

gulp.task('copy-npm-dependencies', ['clear-dependencies'], function() {
  //var npm = 'node_modules/', bower = 'bower_modules';
  return gulp.src(['node_modules/systemjs/dist/system.src.js'], {base: './node_modules'} )
    .pipe(gulp.dest('build/dependencies'));
});

gulp.task('copy-bower-dependencies', ['clear-dependencies'], function() {
	var files = ['bower_components/{jquery,moment}/**/*.min.js'];

	//'bower_components/jquery/**/*.min.js', 'bower_components/moment/**/*.min.js'];
	//['bower_components/tinymce/**/*.{js,css,gif,eot,svg,ttf,woff}',
	return gulp.src(files, {base: './bower_components'})
		.pipe(gulp.dest('build/dependencies'));
});

gulp.task('copy-fonts', ['clear-dependencies'], function() {
	var files = ['bower_components/font-awesome/**/*.{eot,svg,ttf,woff,woff2,otf}'];
	return gulp.src(files)
		.pipe(gulp.dest('build'));
});

/*gulp.task('copy-bower-dependencies', ['clear-dependencies'], function() {
  var files = mainBowerFiles({paths: './', ignore: ['foundation-apps']});
  return gulp.src(files, { base: './bower_components' })
    .pipe(gulp.dest('build/dependencies'));
});*/

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

gulp.task('build', ['build-scss', 'build-ts', 'copyfiles', 'copy-dependencies']); //'build-main'

gulp.task('default', ['watch']);

gulp.task('copyfiles', function() {
    gulp.src('src/**/*.{svg,png,htm,html,js,css,otf,ttf,woff,sfd}')
    .pipe(gulp.dest('build'));
});

gulp.task('clean', function() {
  return del('build/**/*');
});

gulp.task('bundle-app', function() {
	var tsProject = ts.createProject('tsconfig.json');
	return rollup({
      entry: './src/notes/load.ts',
      sourceMap: true
    })
		.pipe(source('load.js', './src/notes'))
		.pipe(buffer())
		.pipe(sourcemaps.init())
		.pipe(ts(tsProject))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('build/dist/index.js'));
});


//gulp.task('generate-tsconfig')


gulp.task('bundle-ts', function() {
  var tsProject = ts.createProject('tsconfig.json');
  return tsProject.src(['src/**/*.ts'])
    .pipe(sourcemaps.init())
    .pipe(ts(tsProject))
    //.pipe(uglify())
    .pipe(jspm())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build'));
});
