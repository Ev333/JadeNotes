import { Note, ContentType } from 'lib/Note'

export class Notebook {

  //public mgr: DbManager
  public path: string;
  public notes: Array<Note>;

  constructor() {
    


  }
};


export class NotebookStub {
  public title : string;
  public id : string;
  public path : string;

  constructor( title : string,  id : string, path : string ) {    
    this.title = title;
    this.id = (id) ? id : null;
    this.path = (path) ? path : null;
  }

  public isValid() {
    return (this.title && this.path);
  }
};