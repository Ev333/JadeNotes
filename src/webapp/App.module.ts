import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { CommonModule }  from '@angular/common';
import { HttpModule, JsonpModule } from '@angular/http';

import { UIRouterModule } from '@uirouter/angular';
import { routerConfig, states } from 'webapp/routing/UIRouterConfig';

//import { RouterModule }  from '@angular/router';

import { AppComponent }				from 'webapp/components/App.component';
import { ErrorComponent } 			from 'webapp/components/Error.component';
import { ShelfComponent } 			from 'webapp/components/Shelf.component';
import { NotebookHomeComponent } 	from 'webapp/components/NotebookHome.component';
import { SettingService } 			from 'webapp/services/SettingServiceWeb';
import { NotebookService }			from 'webapp/services/NotebookService';



// var routes = [
// 	{ path: "/", component: ShelfComponent },
// 	{ path: "/notebook/:id", component: NotebookHomeComponent }
// ]

@NgModule({
  imports: [
		CommonModule,
		BrowserModule,
		FormsModule,
		HttpModule,
		JsonpModule,
		UIRouterModule.forRoot({ 
			states: states, 
			useHash: true,
			config: routerConfig
		})
		//RouterModule.forRoot(routes)
	],
	declarations: [ AppComponent, ShelfComponent, NotebookHomeComponent, ErrorComponent ],
	bootstrap: [ AppComponent ],
	providers: [ SettingService, NotebookService ]
})
export class AppModule { 

	
}
