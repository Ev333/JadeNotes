
const zip = require('adm-zip');
const level = require('levelup');
const sublevel = require('level-sublevel');

const graph = require('levelgraph');

var fs = require('fs');
var path = require('path');



enum FileAction {
  create,
  open
}



export class JnFile {
  private version: string;
  private filePath: string;
	private workspacePath: string;
  private zip: any;

	private graph: any;
	private maindb : any;
	private db : any;

  constructor(sessionId:string, file:string, workspace:string) {
		this.filePath = file;
		this.workspacePath = workspace;

		var dbPath = path.join([this.workspacePath, 'db', 'notebook.db']);

		this.maindb = sublevel(level(path));
		this.db = graph(this.maindb.sublevel('heirarchy-graph'));
  }

	private createFile() {
		var zip = new zip(this.filePath);
	}

	private createDB(dir, callback) {
		var maindb = sublevel(level(path));

		var db = graph(maindb.sublevel('heirarchy-graph'));
		db.batch()
			.put({ subject: 'jn-root' })
			.put({ subject: 'hello', predicate: 'childOf', object: 'jn-root'} );
	}

	private addChild(parentId, childId)
	{
	}

}
