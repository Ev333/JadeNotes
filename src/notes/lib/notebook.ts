import { Note, ContentType } from './note'

  export class Notebook {

    //public mgr: DbManager
    public path: string;
    public notes: Array<Note>;

    constructor() {

    }
  };

  export class NotebookStub {
    public title : string;
    public description : string;
    public path: string;

    constructor( _title : string, _desc : string, _path : string ) {
      this.title = _title;
      this.description = _desc;
      this.path = _path;
    }
  };
