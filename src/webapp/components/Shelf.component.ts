import {Component, ChangeDetectorRef, OnInit}     from '@angular/core';

import {Observable}               from 'rxjs/Observable';
import {Observer}                 from 'rxjs/Observer';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/observable/from';
// import 'rxjs/add/observable/create';

import {SettingService}           from 'webapp/services/SettingServiceWeb';
import {Notebook, NotebookStub}   from 'lib/Notebook';

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
            <label for="name">Name:</label> <input type="text" [(ngModel)]="notebookModel.title" name="title" required />
            <label for="path">Path:</label> <input type="text" [(ngModel)]="notebookModel.path" name="path" required />
            <button type="submit">Create</button>
          </fieldset>
        </form>
      </div>
    </fieldset>

    <table id="notebookTable">
      <tr>
        <th>Title</th>
      </tr>
      <tr *ngFor="let nb of svcSettings.notebooks$ | async">
        <td>
          <a uiSref="notebookHome" [uiParams]="{id: nb.id}">{{nb.title}}</a><br/>
          <span>{{nb.path}}</span>        
        </td>
        <td><button type="button" class="fa fa-edit" title="edit"></button></td>
        <td><button type="button" class="fa fa-trash" title="delete" (click)='deleteNotebook(nb.title)'></button></td>
      </tr>
    </table>
  `
})
export class ShelfComponent implements OnInit {

  // public notebookObservable : Observable<NotebookStub[]>;
  // public notebookObserver : Observer<NotebookStub[]>;

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

    // this.svcSettings.notebooks$.subscribe(
    //   value => { console.log(value) },
    //   error => { console.log(error) },
    //   () => { console.log('complete') }
    //  )

    // this.svcSettings.notebookObservable.subscribe(
    //   data => {
    //     if (!this.hasNotebooks) this.hasNotebooks = true;
    //   }
    // );

    //this.svcSettings.GetNotebooks();
  }

  ngAfterViewInit() {
    this.ready = true;
  }

  public btnCreateNotebookClick() {
    this.notebookModel = new NotebookStub("", null, "");
    this.createMode = !this.createMode;
  }

  public createNotebook(e) {
    //console.log(e);
    //e.preventDefault();
    console.log(`creating notebook`);
    this.svcSettings.CreateNotebook( this.notebookModel );
  }

  public deleteNotebook(id) {
    console.log('deleting notebook: ' + id);
    this.svcSettings.DeleteNotebook(id);
  }

}
