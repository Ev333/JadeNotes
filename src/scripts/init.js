var path = require('path');
var Datastore = require('nedb')

var db = new Datastore({ filename: path.join(__dirname, 'settings.db'), autoload: true });

var config = {

  notebooks: [];
}
