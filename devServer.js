var express = require('express');
var path = require('path');
var server = express();

var browserSync = require('browser-sync');
var DevServerCoreModule = require('./build/devserver/DevServerCore');

var dsCore = new DevServerCoreModule.DevServerCore(__dirname);


server.use(express.static('build/notes'));
server.use(express.static('build/dependencies'));

server.get('/', function(req,res) { 
	res.sendFile( path.join(__dirname, 'build', 'index.html') );
});
        
server.get('/notebooks', function() { dsCore.getNotebooks() });
server.put('/notebooks', function() { dsCore.putNotebooks() });
server.patch('/notebooks/:id', function() { dsCore.patchNotebooks() });


//server.use(dsCore.getRouter());

server.listen({port:3333});
console.log('listening on port 3333');

var bsConfig = require('./bs-config.js');
browserSync.init(bsConfig);

// browserSync.init({

//     server: {
//         routes: {
//             "/": 'build/index.html'
//         },

//         middleware: [
//             { route: '/notebooks', handle: getNotebooks },
//             { route: '/notes', handle: getNotes }
//         ]
//     }

// })




