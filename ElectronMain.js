//'use strict';

//const system = require('systemjs');

const rootPath = __dirname;

const system = require('systemjs');
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipc = electron.ipcMain;
const nedb = require('nedb');
const path = require('path');
//const settings = require('electron-json-storage');

const strNotebooks = 'notebooks';


require('electron-reload')(__dirname);



let settings = new nedb( { filename: path.join(__dirname, 'settings.db'), autoload:true });
initializeSettings();

/*settings.insert( { key: 'notebooks', value: []}, function(err) {
  console.log(err);
});
*/


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

//console.log(__dirname);



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


ipc.on('NewNotebook', function(event, stub) {
  console.log('received NewNotebook IPC call', stub);

  addNotebook(stub, event.sender);

  /*settings.set(stub.title, stub, function(error) {
    if (error) console.log(error);
    else console.log('successfuly added');
  });*/
});

function getNotebooks(sender) {
  console.log('entering getNotebooks');
  settings.find({ 'key': 'notebooks' }, function(err, item) {
    console.log(err, item);
    if (err) console.log(err);
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

ipc.on('GetNotebooks', function(event) {
    //console.log(new Date(), 'received GetNotebooks IPC call');

    getNotebooks(event.sender);
})

/*ipc.on('UpdatedNotebooks', function(event, arg) {
  console.log(arg);  // prints "ping"

  var value = [];
  settings.has(strNotebooks, function(error,hasKey) {
    if (error) console.log(error);
    if (hasKey) {
      settings.get(strNotebooks, function(error, data) {
        if (error) console.log(error);
        else event.sender.send('UpdatedNotebooks', data);
      });

    }
    else {
      event.sender.send('asynchronous-reply', []);
    }
  });
});*/

function addNotebook(stub, sender) {
  settings.update({ key: 'notebooks' }, { $push: { notebooks: stub } }, {},
    function (err, numAffected, affectedDocuments) {
      console.log(err, numAffected, affectedDocuments);
      if (err) console.log(err);
      else {
        console.log(numAffected, affectedDocuments);
        getNotebooks(sender);
      }
    });
}



function initializeSettings() {
  settings.find( { key: 'notebooks' }, function(err, doc) {
    console.log(err, doc);

    if (err) console.log(err);
    else if ( !doc ) {
      console.log('no array');
      settings.insert({ key: 'notebooks', value: [] }, {}, function(err) {
        if (err) console.log(err);
      });
    }
    //else console.log('good doc');
  })
}

function setupDatabase() {


}
