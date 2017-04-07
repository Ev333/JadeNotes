import {NotebookStub} from 'lib/notebook';
import {Note} from 'lib/Note';

export interface iNotebookService {
    currentNotebook: NotebookStub;

    getNote( noteId:string ): Note;
    getChildren( noteId:string ): Note[];
    setCurrentNotebook( stub: NotebookStub ): Note[];
}