import {Component}                from '@angular/core';
import {NgIf, NgFor, AsyncPipe}   from '@angular/common';

import {SettingService}           from '../../services/SettingService';

//import {NotebookService}        from '../services/NotebookService';
import {Observable}               from 'rxjs/Observable';
import {Observer}                 from 'rxjs/Observer';
import {Notebook, NotebookStub}   from '../../lib/notebook';

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
        <form class="addNotebook">
          <fieldset>
            <label for="name">Name:</label> <input type="text" [(ngModel)]="notebookModel.title" name="title" /> <br/>
            <label for="name">Description:</label> <input type="text" [(ngModel)]="notebookModel.description" name="description" /> <br/>
            <label for="name">Path:</label> <input type="text" [(ngModel)]="notebookModel.path" name="path" /> <br/>

            <button type="button" (click)="createNotebook(e)">Create</button>
            <button type="restart">Clear</button>
          </fieldset>
        </form>
      </div>
    </fieldset>

    <table id="notebookTable" >
      <tr>
        <th>Title</th>
        <th>Description</th>
        <th>Path</th>
      </tr>
      <tr *ngFor="let nb of notebooks | async" >
        <td>{{nb.title}}</td>
        <td>{{nb.description}}</td>
        <td>{{nb.path}}</td>
        <td><button class="fa fa-edit" title="edit"></button></td>
        <td><button class="fa fa-trash" title="delete"></button></td>
      </tr>
    </table>
  `
})
export class ShelfComponent {

  public notebooks : Observable<NotebookStub[]>;

  //model for creating new notebooks
  public createMode : boolean = false;
  public notebookModel : NotebookStub;

  private errorMessage: string;

  constructor(private svcSettings: SettingService) {
    console.log('ShelfComponent: Constructor');
  }


  ngOnInit() {
    console.log('ShelfComponent: ngOnInit');
    this.notebooks = this.svcSettings.notebooks;
    this.svcSettings.RefreshNotebooks();
  }

  ngAfterContentChecked() {
    console.log('ShelfComponent: ngAfterContentChecked()')
  }

  public btnCreateNotebookClick(e) {
    this.notebookModel = new NotebookStub("", "", "");
    this.createMode = !this.createMode;
  }

  public createNotebook() {
    console.log('creating notebook');
    this.svcSettings.CreateNewNotebook( this.notebookModel );
  }


}
