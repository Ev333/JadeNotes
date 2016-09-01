'use strict';

const rootPath = __dirname;
//const system = require('systemjs');
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipc = electron.ipcMain;
const nedb = require('nedb');
const pth = require('path');
const del = require('del');
const fs = require('fs');

//const DataURI = require('datauri');


const strNotebooks = 'notebooks';
var uuid = require('node-uuid');

app.setName('JadeNotes');


//create session id
const sessionId = uuid.v4();
console.log(`sessionid: ${sessionId}`)

// set temp path
const appData = app.getPath('appData');
var paths = {
	jnHome: `${appData}\\${app.getName()}`,
	jnTemp: `${appData}\\${app.getName()}\\session\\${sessionId}`,
	jnConfig: `${appData}\\${app.getName()}\\settings.db`
}

console.log(`jnHome: ${paths.jnHome}\njnTemp: ${paths.jnTemp}\njnConfig: ${paths.jnConfig}`);


setAppPath('jnHome', paths.jnHome);
//setAppPath('jnTemp', paths.jnTemp);

//require('electron-reload')(`${__dirname}/ElectronMain.js`, `${__dirname}/build`);

// setup settings database

let settings : any = new nedb( { filename: paths.jnConfig, autoload:true });
settings.find({ '_id': 'notebooks' }, function(err, item) {
	console.log(item);
	if (err) console.log(err);
	if (item.length === 0)  initSettingsDb();
});

//console.log('loaded settings db');


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

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

function deleteNotebook(path, sender) {
  settings.update({ '_id': 'notebooks' }, { $pull: { 'notebooks': {  'path': path }  } }, {},
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

function setAppPath(name, path) {
		fs.exists(path, function(exists) {
			if (!exists) {
				fs.mkdir(path, function(err) {
					if (err) console.log(err);
				});
			}
		});
}
