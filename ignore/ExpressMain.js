

let express = require('express');
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
}
