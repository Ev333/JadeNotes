var express = require('express'),
    router = express.Router();


var browserSync = require('browser-sync');
var devServerCore = require('./build/devserver/DevServerCore.js');

var dsCore = new DevServerCore();

var server = express();
server.use(express.static('build/notes'));
server.use(express.static('build/dependencies'));

var bsConfig = require('./bs-config.js');

bsConfig.middleware = [
    { route: '/', handle: middleware.home },
    { route: '/notebooks/get', handle: middleware.getNotebooks }
];

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

