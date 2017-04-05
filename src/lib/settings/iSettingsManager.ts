import {NotebookStub} from 'jadenotes/lib/Notebook';
import {Observable} from 'rxjs/Observable';

export interface iSettingsManager {
  notebooks : Observable<NotebookStub[]>;
  //notebooks: Array<NotebookStub>;
  addNotebook(stub: NotebookStub);
  deleteNotebook(path: string);
  refreshNotebooks();
  load();
  //getNotebooks() : Observable<NotebookStub[]>;
}
