

import {iSettingsManager}   from './iSettingsManager';
import {Observable}         from 'rxjs/Observable';
import {Observer}           from 'rxjs/Observer';
import {NotebookStub}       from '../notebook';

const ipc = require('electron').ipcRenderer;

export class SettingsManagerDesktop implements iSettingsManager {

  //public x : string = 'hi';
  public notebooks : Observable<NotebookStub[]>;
  private notebookObserver : Observer<NotebookStub[]>;

  private unobserved : boolean = true;
  //public notebooks : Array<NotebookStub>;


  //let obs = Observer;
  public constructor() {
    console.log('SettingsManagerDesktop: constructor()');
    this.notebooks = new Observable(
      observer => this.notebookObserver = observer ).share();

    this.notebooks.subscribe(
      notebooks => console.log(notebooks),
      error => console.log(error));

    ipc.on('UpdatedNotebooks', (event, data : Array<NotebookStub> ) => {
      //console.log(data);
      if (this.unobserved) {
        this.unobserved = false;

      }
      this.notebookObserver.next(data);
    });
  }

  public load() {
    console.log('SettingsManagerDesktop: load()');
    this.getNotebooks();
  }

  destroy() {
    console.log('SettingsManagerDesktop: destroy()');
    ipc.removeAllListeners();
  }

  addNotebook(stub: NotebookStub) {
    console.log('SettingsManagerDesktop: addNotebook()');
    console.log('about to send NewNotebook IPC call');
    ipc.send('NewNotebook', stub);
  }

  getNotebooks() {
    console.log('SettingsManagerDesktop: getNotebooks()');
    ipc.send('GetNotebooks', {}, function() {
      console.log('sent GetNotebooks IPC call');
    });
  }

  refreshNotebooks() {
    console.log('SettingsManagerDesktop: refreshNotebooks()');
    this.getNotebooks();
  }

  private getStubs() : Array<NotebookStub> {
    console.log('SettingsManagerDesktop: getStubs()');
    return [  new NotebookStub('notebook1', 'notebook1 description', 'path1'),
              new NotebookStub('notebook2', 'notebook2 description', 'path2'),
              new NotebookStub('notebook3', 'notebook3 description', 'path3') ];
  }

}
