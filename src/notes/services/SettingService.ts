/*
///<reference path="../../lib/notebook" />
*/

import {NotebookStub} from '../lib/notebook';

import {Injectable}     from '@angular/core';
//import {Http, Response} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';
import {Observer}     from 'rxjs/Observer';

//import 'rxjs/add/operator/of';
//import 'rxjs/add/observable/from';
import 'rxjs/add/operator/share';

const ipc = require('electron').ipcRenderer;


@Injectable()
export class SettingService {

  public ready: boolean = false;

  //public mgr : iSettingsManager;


  public notebooks : Observable<NotebookStub[]>;
  private notebookObserver : Observer<NotebookStub[]>;

  constructor() {
    console.log('SettingService: constructor');

    this.notebooks = new Observable(
      observer => this.notebookObserver = observer
    ).share();

    this.notebooks.subscribe(
      notebooks => console.log(notebooks),
      error => console.log(error)
    );

    ipc.on('UpdatedNotebooks', (event, data : Array<NotebookStub> ) => {
      //console.log(data);
      this.notebookObserver.next(data);
    });
  }

  //public onInit() {}

  public AddExistingNotebook( stub : NotebookStub ) {
    console.log('SettingService: AddExistingNotebook()');
  }

  public CreateNewNotebook( stub : NotebookStub ) {
    console.log('SettingService: CreateNewNotebook');
    ipc.send('NewNotebook', stub);
  }

  public Destroy() {
      console.log('SettingsManagerDesktop: destroy()');
      ipc.removeAllListeners();
  }

  public RefreshNotebooks() {
    console.log('SettingService: RefreshNotebooks');
    ipc.send('GetNotebooks', {}, function() {
      console.log('sent GetNotebooks IPC call');
    });
  }

  private getStubs() : Array<NotebookStub> {
    console.log('SettingsManagerDesktop: getStubs()');
    return [  new NotebookStub('notebook1', 'notebook1 description', 'path1'),
              new NotebookStub('notebook2', 'notebook2 description', 'path2'),
              new NotebookStub('notebook3', 'notebook3 description', 'path3') ];
  }

}
