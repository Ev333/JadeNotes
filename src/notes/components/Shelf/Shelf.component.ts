import {Component}                from '@angular/core';
import {NgIf, NgFor, AsyncPipe}   from '@angular/common';

import {SettingService}           from '../../services/SettingService';

//import {NotebookService}        from '../services/NotebookService';
import {Observable}               from 'rxjs/Observable';
import {Observer}                 from 'rxjs/Observer';
import {Notebook, NotebookStub}   from '../../lib/notebook';

@Component({
  selector: 'shelf',
  templateUrl: './build/notes/components/Shelf/Shelf.template.html'
})
export class ShelfComponent {

  //public notebooks : Array<NotebookStub>;
  public notebooks : Observable<NotebookStub[]>;
  //private notebookObserver : Observable<NotebookStub>;

  //model for creating new notebooks
  public createMode : boolean = false;
  public notebookModel : NotebookStub;

  //public settingService : SettingService;

  private errorMessage: string;

  constructor(private svcSettings: SettingService) {
    console.log('ShelfComponent - Constructor');
  }


  ngOnInit() {
    console.log('ShelfComponent: ngOnInit');

    this.notebooks = this.svcSettings.notebooks;
    this.svcSettings.RefreshNotebooks();
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
