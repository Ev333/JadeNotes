import {Component, ChangeDetectorRef, OnInit}     from '@angular/core';

import {SettingService}           from '../services/SettingService';

import {Observable}               from 'rxjs/Observable';
import {Observer}                 from 'rxjs/Observer';
import 'rxjs/add/operator/map';

import {Notebook}                 from '../lib/notebook';
import {NotebookStub}             from '../lib/NotebookStub';

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
      <tr *ngFor="let nb of notebooks$ | async">
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

  public notebooks$ : Observable<NotebookStub[]>;

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

    this.svcSettings.RefreshNotebooks();
  }

  ngAfterViewInit() {
    this.ready = true;
  }

  public btnCreateNotebookClick() {
    this.notebookModel = new NotebookStub("", null, "");
    this.createMode = !this.createMode;
  }

  public createNotebook(e) {
    console.log(e);
    //e.preventDefault();
    console.log(`creating notebook`);
    this.svcSettings.CreateNewNotebook( this.notebookModel );
  }

  public deleteNotebook(title) {
    console.log('deleting notebook: ' + title);
    this.svcSettings.DeleteNotebook(title);
  }

}
