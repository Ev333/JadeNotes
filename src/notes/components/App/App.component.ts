import {Component} from '@angular/core';
import {ShelfComponent} from '../Shelf/Shelf.component';
import {SettingService} from '../../services/SettingService';
import {NotebookService} from '../../services/NotebookService';

//import {UIROUTER_DIRECTIVES} from "ui-router-ng2";


@Component({
  selector: 'JadeNotes',
  //<ui-view>loading...</ui-view>'
  //template: '<h3>AppComponent</h3>',
  //templateUrl: './App.template.html'
  templateUrl: './build/notes/components/App/App.template.html',
  providers: [SettingService, NotebookService],
  directives: [ShelfComponent]

  //directives: [UIROUTER_DIRECTIVES]
  //template: '<h3>AppComponent</h3>'
  //
})

export class AppComponent {

  //private _svcSettings: SettingService;
  //private _svcNotebooks: NotebookService;

  constructor(private _svcSettings: SettingService, private _svcNotebooks: NotebookService ) {
    //this._svcSettings = _settingService;
    //this._svcNotebooks = _notebookService;
    //this._svcSettings.initialize();
    this._svcSettings.x = 'New Message';
    console.log('AppComponent - Constructor - ', this._svcSettings.x)
  }

  ngOnInit() {
    //console.log('AppComponent: ngOnInit');
    //this.getNotebookStubs();
  }
}
