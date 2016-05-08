import {Component} from '@angular/core';
import {ShelfComponent} from '../Shelf/Shelf.component';
//import {UIROUTER_DIRECTIVES} from "ui-router-ng2";

@Component({
  selector: 'JadeNotes',
  //<ui-view>loading...</ui-view>'
  //template: '<h3>AppComponent</h3>',
  //templateUrl: './App.template.html'
  templateUrl: './build/notes/components/App/App.template.html',
  directives: [ShelfComponent]
  //directives: [UIROUTER_DIRECTIVES]
  //template: '<h3>AppComponent</h3>'
  //
})

export class AppComponent {
  ngOnInit() {
    console.log('AppComponent: ngOnInit');
    //this.getNotebookStubs();
  }

}
