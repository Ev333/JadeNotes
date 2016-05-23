

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
    //this.notebookStubObserver = new Observer<NotebookStub[]>();

    this.notebooks = new Observable(
      observer => this.notebookObserver = observer ).share();

    //console.log('created observable');
    //console.log(this.notebooks);

    ipc.on('UpdatedNotebooks', (event, data : Array<NotebookStub> ) => {
      //console.log('Received UpdatedNOtebooks IPC');
      //console.log(this._notebookStubObserver);
      //console.log(this);

      this.notebookObserver.next(data);
      //if ( this.notebookObserver )  this.notebookObserver.next(data);
      //else console.log('observer not initialized');

    });

    //this.getNotebooks();
  }

  public load() {
    this.getNotebooks();
  }

  destroy() {
    ipc.removeAllListeners();
  }

  addNotebook(stub: NotebookStub) {
    console.log('about to send NewNotebook IPC call');
    //console.log(ipc);
    ipc.send('NewNotebook', stub);
  }

  getNotebooks() {
    //var stubs =

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
