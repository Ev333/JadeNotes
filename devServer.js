// var system = require("systemjs");
// system.config({
// 	defaultJSExtensions: true,
// 	map: {
// 		lib: "build/lib"	
// 	}
// });

var port = 3333;
var jnLib;

var express = require('express'),
	server = express(),
	router = require('./devserver.router'),
	req = require('requirejs'),
	path = require('path'),
	gulp = require('gulp'),
	gulpConfig = require('./gulpfile.js'),
	webpack = require('webpack'),
	webpackConfig = require('./webpack.config.dev.js'),
	webpackCompiler = webpack(webpackConfig),
	webpackDev = require('webpack-dev-middleware');
	//broccoli = require('broccoli-middleware'),
	//browserSync = require('browser-sync'),
	//distPath = path.join(__dirname, dist);

//import webpackConfig from './webpack-config.js';
	//DevServerCoreModule = require('./build/devserver/DevServerCore'),


try {
	console.log(webpackConfig.output.publicPath);
	server.use(webpackDev(
		webpackCompiler, 
		{ publicPath: webpackConfig.output.publicPath }
	));

	server.get('/', function(req,res) { 
		res.sendFile( path.join(__dirname, 'src', 'index.html') );
	});
	//server.use();
}
catch (err) {
	console.log(err);
}

//run gulp tasks to make devserver has its dependencies
gulp.series( gulp.parallel('BuildTsLib', 'BuildTsDevServer'), 'watch');

server.listen({port:3333});
	console.log('listening on port 3333');

function updateLib() {
	jnLib = require(`http://localhost:${port}/jadenotes/lib/jnLib.js`);
}



