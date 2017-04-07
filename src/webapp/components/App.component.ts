import {Component, OnInit} from '@angular/core';

import {SettingService} from 'jadenotes/webapp/services/SettingServiceWeb';
import {NotebookService} from 'jadenotes/webapp/services/NotebookService';

@Component({
  selector: 'notes',
	//providers: [SettingService, NotebookService],
  template: `
    <main id="AppContent">
      <router-outlet></router-outlet>
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
