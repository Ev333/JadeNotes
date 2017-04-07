import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { CommonModule }  from '@angular/common';
import { RouterModule }  from '@angular/router';

import { AppComponent }				from 'webapp/components/App.component';
import { ErrorComponent } 			from 'webapp/components/Error.component';
import { ShelfComponent } 			from 'webapp/components/Shelf.component';
import { NotebookHomeComponent } 	from 'webapp/components/NotebookHome.component';
import { SettingService } 			from 'webapp/services/SettingServiceWeb';

var routes = [
	{ path: "/", component: ShelfComponent },
	{ path: "/notebook/:id", component: NotebookHomeComponent }
]

@NgModule({
  imports: [
		CommonModule,
		BrowserModule,
		FormsModule,
		RouterModule.forRoot(routes)
	],
	declarations: [ AppComponent, ShelfComponent, NotebookHomeComponent, ErrorComponent ],
	bootstrap: [ AppComponent ],
	providers: [ SettingService ]
})
export class AppModule { 

	
}
