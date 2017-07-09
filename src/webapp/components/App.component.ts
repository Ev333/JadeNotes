import {Component, OnInit} from '@angular/core';

import { UIView } from '@uirouter/angular'

import {SettingService} from 'webapp/services/SettingServiceWeb';
import {NotebookService} from 'webapp/services/NotebookService';

@Component({
  selector: 'notes',
  template: `
    <main id="AppContent">
      <ui-view></ui-view>
    </main>
  `
})

export class AppComponent implements OnInit {

  private _svcSettings: SettingService;
  private _svcNotebooks: NotebookService;

  constructor(settings: SettingService, notebooks: NotebookService ) {
    console.log('AppComponent: constructor');

    this._svcSettings = settings;
    this._svcNotebooks = notebooks;
  }

  public ngOnInit() {        
    console.log('AppComponent: ngOnInit');
  }   
}
