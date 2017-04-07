import { Note } from 'lib/note';
import { Notebook } from 'lib/notebook';

export interface INoteManager {
    
    //notebookId : string;

    getRootNotes(): Note[];
    getChildNotes( noteId: number ) : Note[];
    getNote( noteId: number ): Note;
    getParentNote(noteId:number): Note


}


export class NoteManager implements INoteManager
{   
    private notebookId;

    constructor( notebookId:string )
    {


    }

    public getRootNotes(): Note[] {
      return null;
    }

    public getChildNotes( noteId: number ) : Note[] {
        return null;
    }

    public getNote( noteId: number ): Note {
        return null;
    }

    public getParentNote(noteId:number): Note {
        return null;
    }





}