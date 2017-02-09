import { Triple, TriplePackage } from './Triple';

//const zip = require('adm-zip');

import * as level from 'levelup';
import * as sublevel from 'level-sublevel';
import * as graph from 'levelgraph';
import * as fs from 'fs';
import * as path from 'path';
import * as mkdirp from 'mkdirp';
import * as leveldown from 'leveldown';

// const level = require('levelup');
// const sublevel = require('level-sublevel');
// const graph = require('levelgraph');
// var fs = require('fs');
// var path = require('path');
// var mkdirp = require('mkdirp');
// const leveldown = require('leveldown');


export class NotebookManager {

	private homePath: string;
	private notebookPath: string
	private notePath: string;
	private dbPath: string;
	private mainDB;
	private graphDB;

	constructor( _homePath:string, title:string )
	{
		this.homePath = _homePath;
		this.notebookPath = path.join(this.homePath, 'notebooks', title);
		this.dbPath = path.join(this.notebookPath, 'db');
		this.notePath = path.join(this.notebookPath, 'notes');
	}

	public createNotebook(title, callback) {
		console.log(`createNotebook(${title})`);
		console.log(this.homePath)
		console.log(`createNotebook - dbPath: ${this.dbPath}`);

		this.createWorkspace( err => {
			if (err) console.log('createWorkspace error', err);
			else {
				this.createDB( err => {
					if (err) console.log(`createDB error`, err);
					else {
						console.log('db created');
					}
				})
			}

		});

	}

	private createDB(callback) {
		console.log('createdb: ' + this.dbPath);
		this.mainDB = sublevel(level(this.dbPath));
		this.graphDB = graph(this.mainDB.sublevel('jn-main-graph'));

		var actions = {
			put: 'put',
			get: 'get',
			del: 'del'
		};

		var nodes = [
			new TriplePackage( actions.put, null, 'jn-root', null, null ),
			new TriplePackage( actions.put, null, 'jn-hello', 'jn-root', 'jn-childof')
		];

		var ops = [];
		nodes.forEach(  (node) => {
			node.triple.exportLevelGraph(node.action).forEach( t => ops.push(t) ) ;
		});

		this.mainDB.batch(ops, (err) => {
			if (err) console.log('createdb batch error', err);
			callback(err);
		});
	}

	private createWorkspace(callback)
	{
		mkdirp(this.dbPath, err => {
			if (err) console.log(err);
			callback(err);
		});
	}

	public open( filePath:string )
	{
	}

	public addNote() {
	}

	private dbInitialized(callback) {
		this.graphDB.get('jn-root', (err,val) => {
			var isInitialized = (!err && val);
			return callback(isInitialized);
		});
	}

	public getChildren( parentId, callback ) {

		this.graphDB.get( { predicate: 'jn-childof', object: parent }, (err, val) => {
			callback(err,val);
		});
	}
}

//exports = NotebookManager;
