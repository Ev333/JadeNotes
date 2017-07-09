import { UIRouter } from '@uirouter/angular';

import { ShelfComponent } from 'webapp/components/Shelf.component';
import { NotebookHomeComponent } from 'webapp/components/NotebookHome.component';

export var states = [
	{ name: 'shelf', url: "/", component: ShelfComponent },
	{ name: 'notebookhome', url: "/notebook/:id", component: NotebookHomeComponent }
];

export function routerConfig(router: UIRouter) {
  //default route
  router.urlService.rules.otherwise({ state: 'shelf' });
}