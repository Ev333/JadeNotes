import {NotebookStub} from 'jadenotes/lib/NotebookStub';

export interface iSettingService {
    CreateNewNotebook ( stub: NotebookStub );
    DeleteNotebook( title : string );
    Destroy();
    RefreshNotebooks();
}
