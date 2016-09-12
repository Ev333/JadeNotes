(function(global) {
	//var ng2Path = 'dependencies/ng2-bundle/index.js';

	var ng2Path = '../node_modules/@angular'
	var rxPath = '../node_modules/rxjs';
	var admzipPath = '../node_modules/adm-zip';
	var ngModules = ['core','common','http','forms','platform-browser','platform-browser-dynamic', 'compiler', 'router'];
	var rxModules = ['Observable', 'Observer', 'Subject', 'observable/PromiseObservable'];

/*	var bundles = {
		 './dependencies/ng2-bundle/index.js' : ['rxjs/Observable', 'rxjs/Observer', 'rxjs/add/operator/map', 'rxjs/util/root', 'zone',
			'@angular/core', '@angular/common', '@angular/http', '@angular/forms', '@angular/platform-browser', '@angular/platform-browser-dynamic']
	};*/

  // map tells the System loader where to look for things
  var map = {
    //"ui-router-ng2":              "node_modules/ui-router-ng2/ng2",
    //'app':                        'notes', // 'dist',
    'rxjs':                       rxPath,
    '@angular':                   ng2Path,
		//'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',

/*		'rxjs/Rx': ng2Path,
		'rxjs/Observable': ng2Path,
		'rxjs/Observer': ng2Path,
		'rxjs/add/operator/map': ng2Path,
		'rxjs/util/root': ng2Path,
		'zone': ng2Path,
		'@angular/common': ng2Path,
	  '@angular/compiler': ng2Path,
	  '@angular/core': ng2Path,
	  '@angular/http': ng2Path,
	  '@angular/forms': ng2Path,
	  '@angular/platform-browser': ng2Path,
	  '@angular/platform-browser-dynamic': ng2Path,
	  '@angular/router': ng2Path,
	  '@angular/testing': ng2Path,
	  '@angular/upgrade': ng2Path,*/

    //'notes': 'notes'
    //"components": "build/notes/components",
    //"services": "build/notes/services",
    //"lib": "notes/lib"
  };

  // packages tells the System loader how to load when no filename and/or no extension

	//var ng2PackageSettings = {  main: 'index.js', defaultExtension: 'js' };
  var packages = {
    //'app':                        { main: 'main.js',  defaultExtension: 'js' },
    //'rxjs':                       { defaultExtension: 'js', map: ng2Path },
    //'angular2-in-memory-web-api': { defaultExtension: 'js' },

    'notes': { main: 'main.js', defaultExtension: 'js' },

		'rxjs': {
			defaultExtension: 'js',
			map: { main: './node_modules/rxjs/bundles/Rx.umd.min.js' }
		},

		'@angular': {
			defaultExtension: 'js',
			map: {  }
		}
  };


	ngModules.forEach((name, index, array)=>{
		var key =  String.raw`@angular/${name}`;
		packages[key] = { main: String.raw`bundles/${name}.umd.js`, defaultExtension: 'js' };
	});



	/*rxModules.forEach((name, index, array) => {
		var key = String.raw`rxjs/${name}`;
		map[key] = String.raw`./dependencies/rxjs/bundles/Rx.umd.js`;
		packages[key] = { main: 'Rx.umd.js', defaultExtension: 'js' };
	});*/


  var config = {
    defaultJSExtensions: true,
    //transpiler: 'typescript',
		//bundles: bundles,
    map: map,
    packages: packages
  }

  // filterSystemConfig - index.html's chance to modify config before we register it.
  if (global.filterSystemConfig) { global.filterSystemConfig(config); }

  System.config(config);

})(this);
