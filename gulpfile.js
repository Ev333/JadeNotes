var gulp = require('gulp'),
    //util = require('gulp-util'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    ts = require('gulp-typescript'),
    del = require('del');

var webPath = ['./src/notes/**/*.ts'],
  electronPath = ['src/electron-app/**/*.ts'],
  devServerPath = ['src/devserver/**/*.ts', 'src/notes/lib/**/*.ts'],
  staticPath = ['src/**/*.{svg,png,htm,html,js,css,otf,ttf,woff,sfd}'],
  scssPath = ['src/styles/**/*.scss'],
	cssPath = ['build/styles'],  
  destPath = 'build',
  npmPaths = [
    'node_modules/{jquery,moment,levelup,electron}/{dist,build,lib}/**/*.js',
    'node_modules/systemjs/dist/system.js',
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

var tsProjectWebApp = ts.createProject("tsconfig-webapp.json");
var tsProjectDevServer = ts.createProject("tsconfig-devserver.json");


var compileSCSS = function() {
    return gulp.src(scssPath, {base: 'src/styles'})
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(sourcemaps.write())
			.pipe(gulp.dest('build/styles'));
};

var compileWebApp = function() {
  return gulp.src(webPath)
    .pipe(sourcemaps.init())
    .pipe(tsProjectWebApp())
    .pipe(sourcemaps.write())
		.pipe(gulp.dest('build/notes'));
};

var compileDevServer = function() {
  return gulp.src(devServerPath)
    .pipe(sourcemaps.init())
    .pipe(tsProjectDevServer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/devserver'));
};

var copyNpmDependencies = function() {
  return gulp.src(npmPaths, {base: './node_modules'} )
    .pipe(gulp.dest('build/dependencies'));
};

var copyStaticFiles = function() {
    return gulp.src(staticPath)
    .pipe(gulp.dest('build'));
}

gulp.task('compileWebApp', compileWebApp);
gulp.task('compileDevServer', compileDevServer);
gulp.task('copyNpmDependencies', ['clear-dependencies'], copyNpmDependencies);
gulp.task('copyStaticFiles', copyStaticFiles);
gulp.task('compileSCSS', compileSCSS);
gulp.task('build-compileWebApp', ['clean'], compileWebApp);
gulp.task('build-compileDevServer', ['clean'], compileDevServer);
gulp.task('build-copyNpmDependencies', ['clean'], copyNpmDependencies);
gulp.task('build-copyStaticFiles', ['clean'], copyStaticFiles);
gulp.task('build-compileSCSS', ['clean'], compileSCSS);


gulp.task('watch', function() {
  gulp.watch(scssPath, ['compileSCSS'] );
  gulp.watch(devServerPath, ['compileDevServer']);
  gulp.watch(webPath, ['compileWebApp'] );
  gulp.watch(staticPath, ['copyStaticFiles']);
});

gulp.task('clear-dependencies', function() {
	return del(['build/dependencies/**/*', '!build/dependencies']);
});

gulp.task('clean', function() {
  return del(['build/**/*', '!build']);
});

gulp.task('build', ['clean', 'build-compileSCSS', 'build-compileWebApp', 'build-compileDevServer', 'build-copyNpmDependencies', 'build-copyStaticFiles']); 

gulp.task('default', ['watch']);


// gulp.task('webpack-webapp', function() {
//   var entryFile = './src/notes/main.ts';
//   var outputFileName = 'build/notes.js'
//   return gulp.src('./src/notes/main.ts')
//     .pipe( gulpWebpack(require('./webpack-config-webapp.js'), webpack))
//     .pipe(gulp.dest('build/'));
// });

// gulp.task('webpack-devserver', function() {
//    var entryFile = 'src/DevSererCore.ts';
//    var outputFileName = 'build/DevServerCore.js'
//    var config = {
//    }
//    return gulp.src('entryFile')
//      .pipe( gulpWebpack(require('webpack-config-electron.js'), webpack))
//      .pipe(gulp.dest('build/'));
// });

// gulp.task('webpack-electron', function() {
//   var entryFile = 'src/ElectronMain.js';
//   var outputFileName = 'build/electron-app.js'
//   return gulp.src('./src/notes/main.ts')
//     .pipe( gulpWebpack(require('webpack-config-electron.js'), webpack))
//     .pipe(gulp.dest('build/'));
// });

// gulp.task('build-electronApp', function() {
//   return gulp.src(['src/electron-app/**/*.ts'])
//     .pipe(sourcemaps.init())
//     .pipe(tsProjectBackend())
//     .pipe(sourcemaps.write())
//     .pipe(gulp.dest('build/electron-app'));
// });

