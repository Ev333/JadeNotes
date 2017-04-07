import {NotebookStub} from 'lib/notebook';

export interface iSettingService {
    CreateNotebook ( stub: NotebookStub );
    DeleteNotebook( string : string );
    GetNotebooks();
    GetNotebooks( id : string);
}
