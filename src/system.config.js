(function(global) {
	var ngModules = ['core','common','http','forms','platform-browser','platform-browser-dynamic', 'compiler', 'router'];
	var rxModules = ['Observable', 'Observer', 'Subject', 'observable/PromiseObservable'];

  // map tells the System loader where to look for things
  var map = {
    'rxjs': 					'./dependencies/rxjs',
    '@angular': 			'./dependencies/@angular',
		'electron':				'./dependencies/electron/index.js'
  };

  // packages tells the System loader how to load when no filename and/or no extension

  var packages = {
    'notes': { main: 'main.js', defaultExtension: 'js' },

		'rxjs': {
			defaultExtension: 'js',
			map: { main: './dependencies/rxjs/bundles/Rx.min.js' }
		},

		'@angular': {
			defaultExtension: 'umd.js',
			map: {  }
		},

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
    map: map,
    packages: packages
  }

  // filterSystemConfig - index.html's chance to modify config before we register it.
  if (global.filterSystemConfig) { global.filterSystemConfig(config); }

  System.config(config);

})(this);
