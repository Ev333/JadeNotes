import {Component} from '@angular/core';
import {ShelfComponent} from '../Shelf/Shelf.component';
import {SettingService} from '../../services/SettingService';
import {NotebookService} from '../../services/NotebookService';

@Component({
  selector: 'JadeNotes',
	providers: [SettingService, NotebookService],
	//template: `<router-outlet></router-outlet>`
  template: `
    <header></header>
    <main id="AppContent">
      <shelf></shelf>
    </main>
    <footer></footer>
  `
})

export class AppComponent {

  constructor(private _svcSettings: SettingService, private _svcNotebooks: NotebookService ) {
    console.log('AppComponent: constructor')
  }
}
