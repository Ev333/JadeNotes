var gulp = require('gulp'),
    //util = require('gulp-util'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    ts = require('gulp-typescript'),
    del = require('del');

var tsPath = ['./src/**/*.ts'],
  webPath = ['./src/notes/**/*.ts'],
  electronPath = ['src/electron-app/**/*.ts'],
  devServerPath = ['src/devserver/**/*.ts', 'src/notes/lib/**/*.ts'],
  staticPath = ['src/**/*.{svg,png,htm,html,js,css,otf,ttf,woff,sfd}'],
  scssPath = ['src/styles/**/*.scss'],
	cssPath = ['build/styles'],  
  destPath = 'build',
  libPath = ['src/lib/**/*.ts'],
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

var tsProjectWebApp = ts.createProject("tsconfig-webapp.json", {isolatedModules:false});
var tsProjectLib = ts.createProject("tsconfig-lib.json", {isolatedModules:true});
var tsProjectDevServer = ts.createProject("tsconfig-devserver.json", {isolatedModules:true});

// var compileSCSS = function() {
//     return gulp.src(scssPath, {base: 'src/styles'})
//       .pipe(sourcemaps.init())
//       .pipe(sass().on('error', sass.logError))
//       .pipe(sourcemaps.write())
// 			.pipe(gulp.dest('build/styles'));
// };

// var compileLib = function() {
//   return gulp.src(libPath, {base: 'src/lib'})
//     .pipe(sourcemaps.init())
//     .pipe(tsProjectLib())
//     .pipe(sourcemaps.write())
//     .pipe(gulp.dest('build/lib'))
//     .pipe(gulp.dest('node_modules/jadenotes/lib'))
// };

function compileTS(task, srcGlob, destPath, basePath, proj) {
  return gulp.src(srcGlob, {base: basePath, since: gulp.lastRun(task)})
    .pipe(sourcemaps.init())
    .pipe(proj())
    .pipe(sourcemaps.write())
		.pipe(gulp.dest(destPath));
};

function compileSCSS(task, srcGlob, destPath, basePath) {
    return gulp.src(srcGlob, {base: basePath})
	.pipe(sourcemaps.init())
	.pipe(sass().on('error', sass.logError))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest(destPath));
};

function copyNpmDependencies() {
  return gulp.src(npmPaths, {base: './node_modules', since: gulp.lastRun('copyNpmDependencies')} )
    .pipe(gulp.dest('build/dependencies'));
};

function copyStaticFiles() {
    return gulp.src(staticPath, {base: 'src'})
    .pipe(gulp.dest('build'));
}

gulp.task('CleanDev', function() {
	return del('build/**/*');
});

gulp.task('BuildTsWebapp', function() { 
	return compileTS('BuildTsWebapp', webPath, 'build/webapp', 'src/webapp', tsProjectWebApp); 
});

gulp.task('BuildTsLib', function() { 
	return compileTS('BuildTsLib', libPath, 'build/lib', 'src/lib', tsProjectLib); 
});

gulp.task('BuildTsDevServer', function() { 
	return compileTS('BuildTsDevServer', devServerPath, 'build/devserver', 'src/devserver', tsProjectDevServer); 
});

gulp.task('BuildSassDev', function() { 
	return compileSCSS('BuildSassDev', scssPath, 'build/styles', 'build/styles');
});

gulp.task('CopyStaticFilesDev', function() { 
	return copyStaticFiles('CopyStaticFiles'); 
});

//gulp.task('BuildAll', gulp.parallel('BuildTsDev', 'BuildSassDev', 'CopyStaticFilesDev'))

// gulp.task('compileWebApp', compileWebApp);
// gulp.task('compileLib', compileLib);
// gulp.task('compileDevServer', compileDevServer);
// gulp.task('copyNpmDependencies', ['clear-dependencies'], copyNpmDependencies);
// gulp.task('copyStaticFiles', copyStaticFiles);
// gulp.task('compileSCSS', compileSCSS);
// gulp.task('build-compileWebApp', ['clean'], compileWebApp);
// gulp.task('build-compileLib', ['clean'], compileLib);
// gulp.task('build-compileDevServer', ['clean'], compileDevServer);
// gulp.task('build-copyNpmDependencies', ['clean'], copyNpmDependencies);
// gulp.task('build-copyStaticFiles', ['clean'], copyStaticFiles);
// gulp.task('build-compileSCSS', ['clean'], compileSCSS);


gulp.task('watch', function() {
  console.log('starting watch');
  gulp.watch(libPath, gulp.parallel(['BuildTsLib']));
  gulp.watch(devServerPath, gulp.parallel(['BuildTsDevServer']));
  //gulp.watch(scssPath, ['compileSCSS'] );
  //gulp.watch(webPath, ['compileWebApp'] );
  //gulp.watch(staticPath, ['copyStaticFiles']);
});

gulp.task('build', 
  gulp.series([
    'CleanDev', 
    gulp.parallel([
      'BuildTsWebapp',
      'BuildTsLib',
      'BuildSassDev'
    ])
  ])
);

// gulp.task('clear-dependencies', function() {
// 	return del(['build/dependencies/**/*', '!build/dependencies']);
// });

// gulp.task('clean', function() {
//   return del(['build/**/*', '!build']);
// });

// gulp.task('build', gulp.series(
//   'clean',
//   gulp.parallel([
//     'build-compileWebApp',
//     'build-compileLib',
//     'build-compileDevServer',
//     'build-compileSCSS',
//     'build-copyNpmDependencies', 
//     'build-copyStaticFiles'
//   ])
// ));


//gulp.task('default', ['watch']);

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

