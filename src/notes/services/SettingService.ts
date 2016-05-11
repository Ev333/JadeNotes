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


@Injectable()
export class SettingService {
  //private static url1 : string = 'localhost:3000/Data/GetNotebookStubs';

  public notebookStubs : Observable<NotebookStub[]>;


  private notebookStubObserver : Observer<NotebookStub[]>;

  private stubs : NotebookStub[];

  constructor() {
    this.notebookStubs = new Observable( observer => this.notebookStubObserver = observer ).share();
  }

  public load() {
    this.stubs = this.getStubs();

    this.notebookStubObserver.next(this.stubs);
  }

  private getStubs() : Array<NotebookStub> {
    return [  new NotebookStub('notebook1', 'notebook1 description', 'path1'),
              new NotebookStub('notebook2', 'notebook2 description', 'path2'),
              new NotebookStub('notebook3', 'notebook3 description', 'path3') ];
  }

  public AddExistingNotebook( stub : NotebookStub ) {
    
  }

  public CreateNewNotebook( stub : NotebookStub ) {

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

}
