import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { AppComponent }		from './App.component';
import { ShelfComponent } from '../Shelf/Shelf.component';
//import { SettingService } from '../../services/SettingService';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
		ShelfComponent
		//SettingService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
