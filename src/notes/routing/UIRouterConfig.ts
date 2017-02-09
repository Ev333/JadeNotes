import { Injectable, OnInit } from '@angular/core';
import { UIRouter } from 'ui-router-ng2';

@Injectable()
export class UIRouterConfig {

	constructor(router: UIRouter) {
		console.log('UIRouterConfig: constructor', router);		

		//router.urlRouterProvider.otherwise('/');		

		//router.urlRouterProvider.otherwise( () => {
			//console.log('resolving default route');
			//return '/';
		//});
	}
}
