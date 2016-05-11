import {NotebookStub} from '../notebook';
import {Observable} from 'rxjs/Observable';

export interface iSettingsManager {
  addNotebook(stub: NotebookStub);
  getNotebooks() : Observable<NotebookStub[]>;
}
