var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    ts = require('gulp-typescript'),
    inject = require('gulp-inject');
    //wrap = require('gulp-wrap'),
    //declare = require('gulp-declare'),
    //concat = require('gulp-concat');
   //gutil = require('gulp-util'),
   //jshint = require('gulp-jshint'),
   //uglify = require('gulp-uglify');

gulp.task('build-scss', function() {
    return gulp.src('styles/**/*.scss')
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      //.pipe(uglify())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('build/styles'));
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

gulp.task('build-ts', function() {
  var tsProject = ts.createProject('tsconfig.json');
  return tsProject.src(['src/**/*.ts'])
    .pipe(sourcemaps.init())
    .pipe(ts(tsProject))
    //.pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build'));
});

gulp.task('build-dts', function() {
  var tsResult = gulp.src('node_modules/nosqlite/lib/nosqlite.js')
    .pipe(ts( {declaration: true, noExternalResolve: true} ));
  return tsResult.dts.pipe(gulp.dest('./typings'));
});

gulp.task('copy-ng2-templates', function() {
  var tsResult = gulp.src(['src/notes/components/**/*.htm', 'src/notes/components/**/*.html'])
    .pipe(gulp.dest('build/notes/components'));
});

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
  gulp.watch(['styles/**/*.scss'], ['build-scss'] );
  gulp.watch(['src/**/*.ts'], ['build-ts'] );
  gulp.watch(['src/notes/components/**/*.html', 'src/notes/components/**/*.htm'], ['copy-ng2-templates']);
  //gulp.watch(['Electronmain.ts'], ['build-main']);
  //gulp.watch('templates/**/[^_]*.hbs', ['build-handlebars-templates'] );
  //gulp.watch('templates/**/_[.]*.hbs', ['build-handlebars-partials'] );
});

gulp.task('copyNpmDependencies', function() {
  //var npm = 'node_modules/', bower = 'bower_modules';
  return gulp.src([  'node_modules/es6-shim/es6-shim.min.js',
              'node_modules/systemjs/dist/system-polyfills.js',
              'node_modules/angular2/es6/dev/src/testing/shims_for_IE.js',
              'node_modules/angular2/bundles/angular2-polyfills.js',
              'node_modules/systemjs/dist/system.src.js',
              'node_modules/rxjs/bundles/Rx.js',
              'node_modules/angular2/bundles/angular2.dev.js',
              'node_modules/angular2/bundles/http.dev.js',
              'node_modules/systemjs/dist/system-polyfills.js'

            ]).dest('build/dependencies');
});

gulp.task('copyBowerDependencies', function() {
  var npm = 'node_modules/', bower = 'bower_modules';
  return gulp.src([   'bower_components/jquery/dist/jquery.min.js',
                      'bower_components/tinymce/tinymce.min.js',
                      'bower_components/tinymce/themes/modern/theme.js',
                      'bower_components/tinymce/tinymce.jquery.min.js'

            ])
            .pipe(gulp.dest('build/dependencies'));
});

gulp.task('copyFoundation', function() {
  return gulp.src(['bower_components/foundation-apps/**/*.svg',
                      'bower_components/foundation-apps/**/*.scss'
         ])
         .pipe(gulp.dest('build/foundation'));
});

gulp.task('build', ['build-scss', 'build-ts', 'copy-ng2-templates']); //'build-main'

gulp.task('default', ['watch']);

gulp.task('copyDependencies', ['copyNpmDependencies', 'copyBowerDependencies']);



//gulp.task('generate-tsconfig')
