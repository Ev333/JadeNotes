import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { CommonModule }  from '@angular/common';
import { UIRouterModule } from 'ui-router-ng2';

import { AppComponent }				from 'jadenotes/webapp/components/App.component';
import { ErrorComponent } 			from 'jadenotes/webapp/components/Error.component';
import { ShelfComponent } 			from 'jadenotes/webapp/components/Shelf.component';
import { NotebookHomeComponent } 	from 'jadenotes/webapp/components/NotebookHome.component';
import { SettingService } 			from 'jadenotes/webapp/services/SettingServiceWeb';
import { UIRouterConfig } 			from 'jadenotes/webapp/routing/UIRouterConfig';


let appStates = [
	{ name:'shelf', component: ShelfComponent, url: '/', onEnter: () => console.log('shelf state: onEnter()'), onBefore: () => console.log('shelf state: onBefore()') },
	{ name:'notebookHome', component: NotebookHomeComponent, url: '/notebook/:id', onEnter: () => console.log('notebookHome state: onEnter()'), onBefore: () => console.log('shelf state: onBefore()') }
];


@NgModule({
  imports: [
		CommonModule,
		BrowserModule,
		FormsModule,
		UIRouterModule.forRoot({ 
			states: appStates, 
			useHash: true,
			otherwise: { state: 'shelf' } 
		})
	],
	declarations: [ AppComponent, ShelfComponent, NotebookHomeComponent, ErrorComponent ],
	bootstrap: [ AppComponent ],
	providers: [ SettingService ]
})
export class AppModule { }
