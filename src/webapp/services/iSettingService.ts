import {NotebookStub} from 'jadenotes/lib/Notebook';

export interface iSettingService {
    CreateNotebook ( stub: NotebookStub );
    DeleteNotebook( string : string );
    GetNotebooks();
    GetNotebooks( id : string);
}