///<reference path="../../typings/main/ambient/node/index.d.ts" />

//const zip = require('adm-zip');
const level = require('levelup');
const sublevel = require('level-sublevel');
const graph = require('levelgraph');
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
const leveldown = require('leveldown');


export class NotebookManager {

	private homePath: string;

	constructor( _homePath:string )
	{
		this.homePath = _homePath;
	}

	public createNotebook(title, callback) {
		console.log(`createNotebook(${title})`);

		var dbPath = path.join(this.homePath, 'notebooks', title, 'db');
		console.log(this.homePath)
		console.log(`createNotebook - dbPath: ${dbPath}`);

		this.createWorkspace(dbPath, (err) => {
			if (err) console.log('createWorkspace error', err);
			else {
				this.createDB( dbPath, (err) => {
					if (err) console.log(`createDB error`, err);
					else {
						console.log('db created');
					}
				})
			}

		});

	}

	private createDB(dbPath, callback) {
		console.log('createdb: ' + dbPath);
		var maindb = sublevel(level(dbPath));

		var db = graph(maindb.sublevel('jn-main-graph'));

		var node1 = { subject: 'jn-root' };
		var node2 = { subject: 'hello', predicate: 'childOf', object: 'jn-root'};

		// populate database with initial values

		//db.put([node1, node2], function(err) {
		//})

		/*maindb.batch()
			.put(node1)
			.put(node2)
			.write( (err) => {
				if (err) callback(err);
				else callback();
			});*/
	}

	public loadNotebook(title, callback) {

	}

	private createWorkspace( path, callback )
	{


		fs.stat( path, (err, stats) => {
			if (err.code === 'ENOENT')
			{
				//dir doesn't exist so create it
				mkdirp(path, (err) => {
					if (err) {
						console.log(err);
						callback(err);
					}
					else {
						// couldn't create dir
						callback(err);
					}
				});
			}
			else {
				// dir already exists, send callback with error
				var newErr = { code: 'Already Exists' }
				callback(newErr);
			}
		});
	}



	public open( filePath:string )
	{

	}

/*	private addTriple( triple, action ) {
		db.batch([
			{ key: `` }

	  { key: 'spo::A::C::B', value: triple, type: 'put' },
	  { key: 'sop::A::B::C', value: triple, type: 'put' },
	  { key: 'ops::B::C::A', value: triple, type: 'put' },
	  { key: 'osp::B::A::C', value: triple, type: 'put' },
	  { key: 'pso::C::A::B', value: triple, type: 'put' },
	  { key: 'pos::C::B::A', value: triple, type: 'put' }
], alert.bind(null, 'Batch completed!'))
	}
*/


	private sync() {

	}

}

//exports = NotebookManager;
