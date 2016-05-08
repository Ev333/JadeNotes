'use strict';

//const system = require('systemjs');

const rootPath = __dirname;

const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const settings = require('electron-json-storage');

const ipcMain = electron.ipcMain;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

console.log(__dirname);

require('electron-reload')(__dirname);

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform != 'darwin') {
        app.quit();

        //exp.close(); // kill express server
    }
});


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
    // Create the browser window.
    //startExpress(); // start express server

    mainWindow = new BrowserWindow({width: 900, height: 600});

    // and load the index.html of the app.

    //mainWindow.loadURL('index.html');
    mainWindow.loadURL('file://' + __dirname + '/index.html');
    //mainWindow.webContents.openDevTools();


    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;


    });
});

ipcMain.on('GetNotebooksStubsAsync', function(event, arg) {
  console.log(arg);  // prints "ping"
  event.sender.send('asynchronous-reply', [
    new NotebookStub('')
  ]);
});

//system.import('./build/express-app/app.js');
//console.log(WebApp);

/*let express = require('express');
let path = require('path');

var exp = express();

//import {getRouter} from './build/express-app/app.js'; //require('./build/express-app/app.js');
console.log('about to require');
let webApp = require('./build/express-app/app.js');
console.log('done with require');
//console.log(webApp);
//console.log(webApp.JadeNotesWebApp);

//console.log(wb.WebApp);

let router = webApp.JadeNotesWebApp.getRouter(__dirname);
//console.log(router);

exp.use('/jadenotes', router);

function startExpress() {
  exp.listen(3000, 'localhost', function() {
    console.log('express started');
  });
}

function stopExpress() {
  console.log('express stopped');
}*/

/*
var renderIndex = (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
}


exp.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

exp.get('/shelf', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

exp.get('/system.config.js', function(req,res) {
  res.sendFile(  path.join(__dirname, 'system.config.js') );
});

exp.use('/scripts', express.static(  path.join(__dirname, 'node_modules') ));
exp.use('/styles', express.static(  path.join(__dirname, 'build/styles') ));
exp.use('/build', express.static( path.join(__dirname, 'build') ));
exp.use('/fonts', express.static( path.join(__dirname, 'fonts') ));






*/
