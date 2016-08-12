import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { AppComponent }		from './App.component';
import { ShelfComponent } from '../Shelf/Shelf.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
		ShelfComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
