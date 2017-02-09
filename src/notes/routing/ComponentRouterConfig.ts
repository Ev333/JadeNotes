import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotebookHomeComponent } from '../components/NotebookHome.component';
import { ShelfComponent } from '../components/Shelf.component';
import { ErrorComponent } from '../components/Error.component';

const appRoutes: Routes = [
  { path: '/', component: ShelfComponent },
	{ path: '/Notebook/:id', component: NotebookHomeComponent },
  { path: '**', component: ErrorComponent }
];

export const routingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
