var express = require('express');

var server = express();

var browserSync = require('browser-sync');
var DevServerCoreModule = require('./devserver/DevServerCore');

var dsCore = new DevServerCoreModule.DevServerCore();


server.use(express.static('build/notes'));
server.use(express.static('build/dependencies'));
server.use(dsCore.getRouter());

server.listen({port:3333});
console.log('listening on port 3333');

var bsConfig = require('../bs-config.js');
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

