'use strict';

const rootPath = __dirname;
//const system = require('systemjs');
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipc = electron.ipcMain;
const nedb = require('nedb');
const pth = require('path');
const strNotebooks = 'notebooks';

const configPath = __dirname;
//const configPath = app.getPath('userData');

//const tempPath = app.getPath('temp');

//const DataURI = require('datauri');


//require('electron-reload')(`${__dirname}/ElectronMain.js`, `${__dirname}/build`);

app.setName('JadeNotes');

console.log('loaded requirements');

// setup settings database

var dbPath = pth.join(__dirname, 'settings.db'); //String.raw`${__dirname}\\settings.db`;
console.log(dbPath);
let settings : any = new nedb( { filename: dbPath, autoload:true });

//console.log('loaded settings db');


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;


app.on('ready', function() {
  mainWindow = new BrowserWindow({width: 900, height: 600})

  var webroot = String.raw`file://${__dirname}/index.html`;
  console.log(webroot);
  mainWindow.loadURL(webroot);
  //mainWindow.loadURL(`file://${__dirname}/index.html`)
  mainWindow.webContents.openDevTools();  // Open DevTools.

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
});


app.on('window-all-closed', function() {
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
