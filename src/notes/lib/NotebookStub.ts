export class NotebookStub {
  public title : string;

  constructor( _title : string ) {
    this.title = _title;
  }

  public isValid() {
    return (this.title);
  }
};
