(function(global) {

  // map tells the System loader where to look for things
  var map = {
    //"ui-router-ng2":              "node_modules/ui-router-ng2/ng2",
    'app':                        'app', // 'dist',
    'rxjs':                       'node_modules/rxjs',
    'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
    '@angular':                   'node_modules/@angular',

    'notes': 'build/notes',
    "components": "build/notes/components",
    "services": "build/notes/services",
    "lib": "build/notes/lib"
  };

  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    //'app':                        { main: 'main.js',  defaultExtension: 'js' },
    'rxjs':                       { defaultExtension: 'js' },
    'angular2-in-memory-web-api': { defaultExtension: 'js' },

    'app': { defaultExtension: 'ts' },

    '@angular/common': { main: 'index.js', defaultExtension: 'js' },
    '@angular/compiler': { main: 'index.js', defaultExtension: 'js' },
    '@angular/core': { main: 'index.js', defaultExtension: 'js' },
    '@angular/http': { main: 'index.js', defaultExtension: 'js' },
    '@angular/forms': { main: 'index.js', defaultExtension: 'js' },
    '@angular/platform-browser': { main: 'index.js', defaultExtension: 'js' },
    '@angular/platform-browser-dynamic': { main: 'index.js', defaultExtension: 'js' },
    '@angular/router': { main: 'index.js', defaultExtension: 'js' },
    '@angular/testing': { main: 'index.js', defaultExtension: 'js' },
    '@angular/upgrade': { main: 'index.js', defaultExtension: 'js' }
  };

  //var packageNames = [

  //];

  // add package entries for angular packages in the form '@angular/common': { main: 'index.js', defaultExtension: 'js' }
  //packageNames.forEach(function(pkgName) {
    //packages[pkgName] = { main: 'index.js', defaultExtension: 'js' };
  //});

  var config = {
    defaultJSExtensions: true,
    transpiler: 'typescript',
    map: map,
    packages: packages
  }

  // filterSystemConfig - index.html's chance to modify config before we register it.
  if (global.filterSystemConfig) { global.filterSystemConfig(config); }

  System.config(config);

})(this);
