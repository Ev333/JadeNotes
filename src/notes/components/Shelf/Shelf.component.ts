import {Component} from '@angular/core';
import {NgIf, NgFor, AsyncPipe} from '@angular/common';

import {SettingService} from '../../services/SettingService';
//import {NotebookService} from '../services/NotebookService';
import {Observable}         from 'rxjs/Observable';
import {Observer}           from 'rxjs/Observer';
import {Notebook, NotebookStub} from '../../lib/notebook';


//module Landing.component {
@Component({
  selector: 'shelf',
  templateUrl: './build/notes/components/Shelf/Shelf.template.html'//,
  //providers: [SettingService]
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
    console.log('constructor');
    //this.settingService = _settingService;
    //this.notebooks = new Array<NotebookStub>();
    //this.notebookModel = new NotebookModel();

    console.log('ShelfComponent - Constructor - ', svcSettings.x);



    //this.notebooks = _settingService.getNotebookStubs();


    //this.settingService.refreshNotebooks();
  }

  //ngOnInit() {
    //console.log('ngOnInit');
  //}

  ngOnInit() {
    console.log('ngAfterViewChecked');

    this.notebooks = this.svcSettings.mgr.notebooks;

    this.notebooks.subscribe(
      notebooks => console.log(notebooks),
      error => console.log(error));

/*    this.svcSettings.mgr.notebooks
                     .subscribe(
                       notebooks => this.notebooks = notebooks,
                       error =>  console.log(error));//this.errorMessage = <any>error);
    console.log('subscribed', this.svcSettings.mgr);
*/
    //this.notebooks = this.svcSettings.mgr.load();
    this.svcSettings.mgr.load();
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

//class NotebookModel {
    //public name : string;
//}
//}
