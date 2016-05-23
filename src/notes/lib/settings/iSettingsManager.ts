import {NotebookStub} from '../notebook';
import {Observable} from 'rxjs/Observable';

export interface iSettingsManager {
  notebooks : Observable<NotebookStub[]>;
  //notebooks: Array<NotebookStub>;
  addNotebook(stub: NotebookStub);
  refreshNotebooks();
  load();
  //getNotebooks() : Observable<NotebookStub[]>;
}
