

import {iSettingsManager}   from './iSettingsManager';
import {Observable}         from 'rxjs/Observable';
import {Observer}           from 'rxjs/Observer';
import {NotebookStub}       from '../notebook';

const ipc = require('electron').ipcRenderer;

export class SettingsManagerDesktop implements iSettingsManager {

  //public x : string = 'hi';
  public notebooks : Observable<NotebookStub[]>;
  private notebookObserver : Observer<NotebookStub[]>;

  //public notebooks : Array<NotebookStub>;


  //let obs = Observer;
  public constructor() {
    this.notebooks = new Observable(
      observer => this.notebookObserver = observer ).share();

    this.notebooks.subscribe(
        notebooks => console.log(notebooks),
        error => console.log(error));

    ipc.on('UpdatedNotebooks', (event, data : Array<NotebookStub> ) => {
      this.notebookObserver.next(data);
    });
  }

  public load() {
    this.getNotebooks();
  }

  destroy() {
    ipc.removeAllListeners();
  }

  addNotebook(stub: NotebookStub) {
    console.log('about to send NewNotebook IPC call');
    ipc.send('NewNotebook', stub);
  }

  getNotebooks() {
    ipc.send('GetNotebooks', {}, function() {
      console.log('sent GetNotebooks IPC call');
    });
  }

  refreshNotebooks() {
    this.getNotebooks();
  }

  private getStubs() : Array<NotebookStub> {
    return [  new NotebookStub('notebook1', 'notebook1 description', 'path1'),
              new NotebookStub('notebook2', 'notebook2 description', 'path2'),
              new NotebookStub('notebook3', 'notebook3 description', 'path3') ];
  }

}
