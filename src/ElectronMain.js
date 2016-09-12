'use strict';

var 	System = require('systemjs'),
			electron = 		require('electron'),
			app = 				electron.app,
			BrowserWindow = electron.BrowserWindow,
			ipc = electron.ipcMain,
			nedb = require('nedb'),
			path = require('path'),
			del = require('del'),
			fs = require('fs'),
			uuid = require('node-uuid'),
			//level = require('levelup'),
			mkdirp = require('mkdirp');

var n = require('./electron-app/NotebookManager.js');
var NotebookManager = n.NotebookManager;
console.log(NotebookManager);


const rootPath = __dirname,
						strNotebooks = 'notebooks';

let mainWindow, appData, paths, settings;




//const DataURI = require('datauri');


start();

//var n = require('./electron-app/file-format/NotebookManager.js');
//console.log(n, n.NotebookManager);
//import { NotebookManager } from 'electron-app/file-format/NotebookManager';

function start() {

	app.setName('JadeNotes');


	//create session id
	const sessionId = uuid.v4();
	console.log(`sessionid: ${sessionId}`)

	// set temp path
	appData = app.getPath('appData');
	paths = {
		jnHome: path.join(appData, app.getName()),
		jnNotebooks: path.join(appData, app.getName(), 'notebooks'),
		jnTemp: path.join(appData, app.getName(), 'session', sessionId),
		jnConfig: path.join(appData, app.getName(), 'settings.db')
	}

		//console.log(`jnHome: ${paths.jnHome}\njnTemp: ${paths.jnTemp}\njnConfig: ${paths.jnConfig}`);

		//require('electron-reload')(`${__dirname}/ElectronMain.js`, `${__dirname}/build`);


		setAppPath('jnHome', paths.jnHome);

		// setup settings database
		settings = new nedb( { filename: paths.jnConfig, autoload:true });
		settings.find({ '_id': 'notebooks' }, function(err, item) {
			console.log(item);
			if (err) console.log(err);
			if (item.length === 0)  initSettingsDb();
		});

		app.on('ready', () => {
		  mainWindow = new BrowserWindow({width: 900, height: 600})

		  var webroot = String.raw`file://${__dirname}/index.html`;
		  mainWindow.loadURL(webroot);
		  mainWindow.webContents.openDevTools();  // Open DevTools.

		  mainWindow.on('closed', function () {
		    mainWindow = null;
		  });
		})
		.on('window-all-closed', () => {
		  // Quit when all windows are closed.
		    // On OS X it is common for applications and their menu bar
		    // to stay active until the user quits explicitly with Cmd + Q
		    if (process.platform != 'darwin') {
		        app.quit();
		    }
		});


		ipc.on('NewNotebook', function(event, stub) {
		  console.log(`received NewNotebook IPC call`);
		  addNotebook(stub, event.sender);
		});

		ipc.on('GetNotebooks', function(event) {
		    console.log('Received GetNotebooks IPC call');
		    getNotebooks(event.sender);
		});

		ipc.on('DeleteNotebook', function(event, path) {
		  console.log('Received DeleteNotebooks IPC call');
		  deleteNotebook(path, event.sender);
		});
	//});
}

function getNotebooks(sender) {
  console.log('entering getNotebooks');
  settings.find({ '_id': 'notebooks' }, function(err, item) {
    if (err) console.log(`getNotebooks error: ${err}`);
    else {
      if ( item.length > 0 )
      {
        console.log('about to send UpdatedNotebooks IPC');
        sender.send('UpdatedNotebooks', item[0].notebooks);
      }
      else console.log('no notebooks to send');
    }
  });
}

function deleteNotebook(title, sender) {
	console.log(title);
  settings.update({ '_id': 'notebooks' }, { $pull: { 'notebooks': {  'title': title }  } }, {},
    function (err, numAffected, affectedDocuments) {
      //console.log(err, numAffected, affectedDocuments);
      if (err) console.log(`deleteNotebook Error: ${err}`);
      else {
        console.log( `deleteNotebook: ${numAffected}, ${affectedDocuments}`);
        getNotebooks(sender);
      }
    });
}

function addNotebook(stub, sender) {
  settings.update({ '_id': 'notebooks' }, { $push: { notebooks: stub } }, {},
    function (err, numAffected, affectedDocuments) {
      //console.log(err, numAffected, affectedDocuments);
      if (err) console.log(`addNotebook error: ${err}`);
      else {
				var p = path.join(paths.jnHome);
				var mgr = new NotebookManager(p);
				mgr.createNotebook(stub.title, (err) => {
					if (err) console.log(err);
				});

        console.log(numAffected);
        getNotebooks(sender);
      }
    });
}

function initSettingsDb() {
	console.log('initSettingsDb');
	var config = {
	  '_id': 'notebooks',
	  'notebooks': []
	}

	settings.insert(config, function(err, newDoc) {
	  if (err) console.log(err);
	});
}

function setAppPath(name, dir) {
		fs.exists(dir, function(exists) {
			if (!exists) {
				mkdirp(dir, function(err) {
					if (err) console.log(err);
				});
			}
		});
}
