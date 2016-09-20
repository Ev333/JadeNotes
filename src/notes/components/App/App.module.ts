import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { CommonModule }  from '@angular/common';



import { AppComponent }		from './App.component';
import { ErrorComponent } from '../Error/Error.component';
import { ShelfComponent } from '../Shelf/Shelf.component';
import { NotebookHomeComponent } from '../Notebook/NotebookHome.component';
import { SettingService } from '../../services/SettingService';
//import { routing, routingProviders } from '../../routing/ComponentRouterConfig';

//import { UIRouterModule, provideUIRouter } from 'ui-router-ng2';
//import { UIRouterConfig } from '../../routing/UIRouterConfig';
//import {Ng2StateDeclaration} from "ui-router-ng2/ng2/interface";

@NgModule({
  imports: [ BrowserModule, CommonModule, FormsModule ], //routing
  declarations: [ AppComponent, ShelfComponent, NotebookHomeComponent, ErrorComponent ],
  bootstrap: [ AppComponent ],
	providers: [
		SettingService
	]
})
export class AppModule { }
