import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { CommonModule }  from '@angular/common';



import { AppComponent }		from './App.component';
import { ShelfComponent } from '../Shelf/Shelf.component';
import { SettingService } from '../../services/SettingService';

@NgModule({
  imports: [ BrowserModule, CommonModule, FormsModule ],
  declarations: [ AppComponent, ShelfComponent ],
  bootstrap: [ AppComponent ],
	providers: [ SettingService ]
})
export class AppModule { }
