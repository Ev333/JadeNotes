/*
///<reference path="../../lib/notebook" />
*/

import {NotebookStub} from '../lib/notebook';

import {Injectable}     from '@angular/core';
//import {Http, Response} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';
import {Observer}     from 'rxjs/Observer';

import {iSettingsManager} from '../lib/settings/iSettingsManager';
import {SettingsManagerDesktop} from '../lib/settings/SettingsManagerDesktop';
//import 'rxjs/add/operator/of';

//import 'rxjs/add/observable/from';
import 'rxjs/add/operator/share';

const ipc = require('electron').ipcRenderer;


@Injectable()
export class SettingService {

  public ready: boolean = false;

  //public mgr : iSettingsManager;

  public x : String = 'x';

  public notebooks : Observable<NotebookStub[]>;
  private notebookObserver : Observer<NotebookStub[]>;

  private mgr : iSettingsManager;

  constructor() {
    this.mgr = new SettingsManagerDesktop();
    this.notebooks = this.mgr.notebooks;
  }

/*  public onInit() {

  }*/

  public AddExistingNotebook( stub : NotebookStub ) {
  }

  public CreateNewNotebook( stub : NotebookStub ) {
    this.mgr.addNotebook(stub);
  }

  public RefreshNotebooks() {
    this.mgr.refreshNotebooks();
  }

  getNotebooks() {
    return '';
  }

  /*private extractData(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    let body = res.json();
    return body.data || { };
  }

  private handleError (error: any) {
    // In a real world app, we might send the error to remote logging infrastructure
    let errMsg = error.message || 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }*/

/*  private initializeElectron() {
    ipc.on('UpdatedNotebooks', function(event, data : Array<NotebookStub> ) {
      this.notebookObserver.next(data);
    });
  }*/

/*  private addNotebookElectron(stub: NotebookStub) {
    console.log('about to send NewNotebook IPC call');
    //console.log(ipc);
    ipc.send('NewNotebook', stub);
  }*/

/*  private getNotebooksDesktopMode() {
    //var stubs =
    ipc.send('GetNotebooks', {}, function() {
      console.log('sent GetNotebooks IPC call');
    });
  }*/

}
