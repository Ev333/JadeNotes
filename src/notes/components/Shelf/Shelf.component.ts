import {Component} from '@angular/core';
import {NgIf, NgFor} from '@angular/common';
//import {HTTP_PROVIDERS} from '@angular/http';
import {SettingService} from '../../services/SettingService';
//import {NotebookService} from '../services/NotebookService';
import {Notebook, NotebookStub} from '../../lib/notebook';


//module Landing.component {
@Component({
  selector: 'shelf',
  templateUrl: './build/notes/components/Shelf/Shelf.template.html',
  providers: [SettingService]
})
export class ShelfComponent {

  public createMode : boolean = false;

  public notebooks : NotebookStub[];

  public notebookModel : NotebookStub;

  private settingService : SettingService;

  private errorMessage: string;

  constructor(_settingService: SettingService) {
    this.settingService = _settingService;
    this.notebooks = new Array<NotebookStub>();
    //this.notebookModel = new NotebookModel();

    //this.notebooks = _settingService.getNotebookStubs();


  }

  ngOnInit() {
    console.log('ngOnInit');

    this.settingService.notebookStubs
                     .subscribe(
                       notebookStubs => this.notebooks = notebookStubs,
                       error =>  this.errorMessage = <any>error);

    this.settingService.load();
    //this.getNotebookStubs();
  }

  public getNotebookStubs() {

    //this.notebooks = this.settingService.getNotebookStubs();
    //this.settingService.getNotebookStubs()
      //.subscribe(
        //notebooks => this.notebooks = notebooks,
        //error =>  this.errorMessage = <any>error);
  }

  public btnCreateNotebookClick(e) {
    this.notebookModel = new NotebookStub("", "", "");
    this.createMode = !this.createMode;
  }

  public createNotebook() {
    console.log('creating notebook');
  }


}

//class NotebookModel {
    //public name : string;
//}
//}
