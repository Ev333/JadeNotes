import {Component, ChangeDetectorRef}                from '@angular/core';
import {NgIf, NgFor, AsyncPipe}   from '@angular/common';


import {SettingService}           from '../../services/SettingService';

import {Observable}               from 'rxjs/Observable';
import {Observer}                 from 'rxjs/Observer';
//import {Subject}                 from 'rxjs/Subject';
import 'rxjs/add/operator/map';

import {Notebook}                 from '../../lib/notebook';
import {NotebookStub}             from '../../lib/NotebookStub';

@Component({
  selector: 'shelf',
  template: `
    <fieldset id="bookshelf" class="outerContainer">
      <legend>Actions</legend>

      <div class="buttonset">
        <button id="btnCreateNotebook" (click)="btnCreateNotebookClick()">Create Notebook</button>
      </div>
      <br/>

      <div *ngIf="createMode">
        <form class="addNotebook" (ngSubmit)='createNotebook(e)'>
          <fieldset>
            <label for="name">Name:</label> <input type="text" [(ngModel)]="notebookModel.title" name="title" required /> <br/>
            <label for="name">Path:</label> <input type="text" [(ngModel)]="notebookModel.path" name="path" required /> <br/>

            <button type="submit">Create</button>
          </fieldset>
        </form>
      </div>
    </fieldset>

    <table id="notebookTable">
      <tr>
        <th>Title</th>
        <th>Path</th>
      </tr>
      <tr *ngFor="let nb of notebooks$ | async" >
        <td>{{nb.title}}</td>
        <td>{{nb.path}}</td>
        <td><button type="button" class="fa fa-edit" title="edit"></button></td>
        <td><button type="button" class="fa fa-trash" title="delete" (click)='deleteNotebook(nb.path)'></button></td>
      </tr>
    </table>
  `
})
export class ShelfComponent {

  //public notebookObserver : Observer<NotebookStub[]>;
  public notebooks$ : Observable<NotebookStub[]>;
  //public notebooks$ : Subject<NotebookStub[]>;

  //model for creating new notebooks
  public createMode : boolean = false;
  public notebookModel : NotebookStub;

  public hasNotebooks : boolean = false;

  private uselessFlag : boolean = false;

  private ready: boolean = false;

  private errorMessage: string;

  constructor(private svcSettings: SettingService, private cd: ChangeDetectorRef) {
    console.log('ShelfComponent: Constructor');
  }


  ngOnInit() {
    console.log('ShelfComponent: ngOnInit');

    this.notebooks$ = this.svcSettings.notebooks$;

    this.svcSettings.notebooks$.subscribe(
      data => {
        if (!this.hasNotebooks) this.hasNotebooks = true;
      }
    );

/*    this.svcSettings.notebooks$.subscribe(
      notebooks => {
        console.log(notebooks);
        this.hasNotebooks = true;
        this.cd.markForCheck();
        //console.log('hi');
        //console.log('hi ' + notebooks);
      },
      error => console.log(error)
    );*/


/*    this.notebooks$ = new Observable<NotebookStub[]>(
      observer => this.svcSettings.notebookObserver = observer
    ).share();*/

/*    this.notebooks$.subscribe(
      notebooks => {
        console.log(notebooks)
      },
      error => console.log(error)
    );*/

    this.svcSettings.RefreshNotebooks();
  }

  ngAfterViewInit() {
    this.ready = true;
  }

  public btnCreateNotebookClick() {
    this.notebookModel = new NotebookStub("", "");
    this.createMode = !this.createMode;
  }

  public createNotebook(e) {
    console.log(e);
    //e.preventDefault();
    console.log(`creating notebook`);
    this.svcSettings.CreateNewNotebook( this.notebookModel );
  }

  public deleteNotebook(path) {
    console.log('deleting notebook: ' + path);
    this.svcSettings.DeleteNotebook(path);
  }

}
