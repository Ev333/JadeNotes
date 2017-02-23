var path = require('path');
var Datastore = require('nedb')

var dbPath = path.join(__dirname, 'build', 'settings.db'); //String.raw`${__dirname}\/build\/settings.db`;
console.log(dbPath);
var db = new Datastore({ filename: dbPath, autoload: true });

var config = {
  '_id': 'notebooks',
  'notebooks': []
}

db.insert(config, function(err, newDoc) {
  if (err) console.log(err);
});