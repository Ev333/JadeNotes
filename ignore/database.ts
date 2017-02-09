///<reference path="../../../typings/main/ambient/node/index.d.ts" />

import { Note, ContentType } from './note'

//declare require : function(name:string);

//var nosqlite : any = require('nosqlite');

import * as nosqlite from 'nosqlite';

  export class DbManager {

      private connection : any;
      private db : any;

      constructor(dbPath : string, name : string, create : boolean) {
        this.connection = new(nosqlite.Connection)(dbPath);
        this.db = this.connection.database(name);

        if (!this.db.existsSync() ) {
          //db doesn't exists
          if (create) this.db.createSync();
        }
        else {
          // db exists

        }


      }

      adoptNote( childNote: Note, parentNote : Note )
      {
        var prevParentId = childNote.getParentId();
        if (prevParentId) {
          // if exists

          //this.db.updateSync(prevParentId, )
        }


        childNote.setParent(  parentNote );
        this.db.updateSync( childNote.id, { parentId : parentNote.id } );
        this.db.updateSync( parentNote.addChild )

      }

      addNote ( newNote : Note  ) {
        this.db.AddSync( newNote.id, newNote );
      }

      deleteNote( noteId : string ) {
        this.db.DeleteSync( noteId );
      }

      getRootNotes() : Array<Note> {
        var values = this.db.FindSync( { parentId : null } );
        return values;
      }

      getChildNotes( parentNote : Note ) : Array<Note> {
        var values = this.db.FindSync({ parentId : parentNote.id });
        return values;
      }
  }
