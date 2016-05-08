///<reference path="../../../typings/main/ambient/node/index.d.ts" />
///<reference path="../../../typings/main/definitions/node-uuid/index.d.ts" />

//var uuid = require('uuid');

export enum ContentType { Text, HTML };

export class Note {
  public id : string;
  public title : string;
  public type : ContentType;
  public content : string;

  protected childrenIds : Array<string>;
  protected parentId : string;

  constructor( _title : string, _type : ContentType, _content : string, parentId : string ) {
    this.id = uuid.v4();
    this.title = _title;
    this.type = _type;
    this.content = _content;
  }

  public setId( id : string ) {
    this.id = id;
  }

  public getParentId() : string {
    return this.parentId;
  }

  public setParent( newParent : Note ) {
    this.parentId = newParent.id;
  }

  public addChild( child : Note) {
    this.childrenIds.push(child.id)
  }
}
