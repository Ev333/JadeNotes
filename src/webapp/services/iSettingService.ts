import {NotebookStub} from 'lib/Notebook';
import {Observable} from 'rxjs/Observable';

export interface iSettingService {
    CreateNotebook ( stub: NotebookStub );
    DeleteNotebook( string : string );
    GetNotebooks();
    GetNotebooks( id : string);
}
