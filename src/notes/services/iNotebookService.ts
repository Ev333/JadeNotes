import {NotebookStub} from 'jadenotes/lib/NotebookStub';
import {Note} from 'jadenotes/lib/Note';

export interface iNotebookService {
    currentNotebook: NotebookStub;

    getNote( noteId:string ): Note;
    getChildren( noteId:string ): Note[];
    setCurrentNotebook( stub: NotebookStub ): Note[];
}