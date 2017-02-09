import {Component, OnInit} from '@angular/core';
import {UIRouter, trace, StateDeclaration} from 'ui-router-ng2';

import {SettingService} from '../services/SettingService';
import {NotebookService} from '../services/NotebookService';

@Component({
  selector: 'notes',
	providers: [SettingService, NotebookService],
  template: `
    <header></header>
    <main id="AppContent">
			<ui-view></ui-view>
    </main>
    <footer></footer>
  `
})

export class AppComponent implements OnInit {

  private _router: UIRouter;
  private _svcSettings: SettingService;
  private _svcNotebooks: NotebookService;

  constructor(settings: SettingService, notebooks: NotebookService, router: UIRouter ) {
    console.log('AppComponent: constructor');

    this._router = router;
    this._svcSettings = settings;
    this._svcNotebooks = notebooks;

    //this._router.urlRouterProvider.otherwise('/');
    //trace.enable(1, 5);
  }

  public ngOnInit() {        
    console.log('AppComponent: ngOnInit');
  }   
}
