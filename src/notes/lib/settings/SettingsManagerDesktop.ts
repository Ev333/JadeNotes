///<reference path="../../../../typings/main/ambient/electron-json-storage/index.d.ts" />

import {iSettingsManager} from './iSettingsManager';
import {Observable} from 'rxjs/Observable';
import {NotebookStub} from '../notebook';

export class SettingsManagerDesktop implements iSettingsManager {

  public notebooks : Observable<NotebookStub[]>;

  constructor() {
    
  }

  addNotebook(stub: NotebookStub) {

  }

  getNotebooks() : Observable<NotebookStub[]> {
    //var stubs =

    //this.notebookStubs = new Observable( observer => this.notebookStubObserver = observer ).share();
    return null;
  }

  private getStubs() : Array<NotebookStub> {
    return [  new NotebookStub('notebook1', 'notebook1 description', 'path1'),
              new NotebookStub('notebook2', 'notebook2 description', 'path2'),
              new NotebookStub('notebook3', 'notebook3 description', 'path3') ];
  }

}
