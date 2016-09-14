import {Component} from '@angular/core';
import {ShelfComponent} from '../Shelf/Shelf.component';
import {SettingService} from '../../services/SettingService';
import {NotebookService} from '../../services/NotebookService';

//import {UIROUTER_DIRECTIVES} from "ui-router-ng2";


@Component({
  selector: 'JadeNotes',
  template: `
    <header></header>
    <main id="AppContent">
      <shelf></shelf>
    </main>
    <footer></footer>
  `,
  providers: [SettingService, NotebookService]
})

export class AppComponent {

  constructor(private _svcSettings: SettingService, private _svcNotebooks: NotebookService ) {
    console.log('AppComponent: constructor')
  }
}
