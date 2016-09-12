console.log(__dirname);



System.config( {
	defaultJSExtensions: true,
	map: {
	},
	packages: {
		'electron-app': {
			{ main: 'NotebookManager.js', defaultExtension: 'js' }
		}
	}
});

System.import('electron-app/NotebookManager.js').then( function(m) {
	console.log(m);
	//start();
})
.catch( function(err) {
	console.log(err);
});
