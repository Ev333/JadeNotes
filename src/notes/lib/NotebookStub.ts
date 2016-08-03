export class NotebookStub {
  public title : string;
  public path: string;

  constructor( _title : string, _path : string ) {
    this.title = _title;
    this.path = _path;
  }

  public isValid() {
    return (this.title && this.path);
  }
};
