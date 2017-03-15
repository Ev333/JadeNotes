
import {iSettingService} 		from 'jadenotes/webapp/services/iSettingService';
import {NotebookStub} 			from 'jadenotes/lib/NotebookStub';

import {Injectable, NgZone}     from '@angular/core';
import {Jsonp} 					from '@angular/http';
import {Observable}     		from 'rxjs/Observable';
import {Observer}     			from 'rxjs/Observer';
import 'rxjs/add/operator/map';

@Injectable()
export class SettingService implements iSettingService {
	private _jsonp : Jsonp;

	constructor(jsonpDep : Jsonp ) {
		this._jsonp = jsonpDep;
	}

	public notebooks : NotebookStub[];

	public notebooks$ : Observable<NotebookStub[]>;
	private notebookObserver : Observer<NotebookStub[]>;

	public CreateNewNotebook ( stub: NotebookStub ) {
		
	}

    public DeleteNotebook( title : string ) {

	}

    public Destroy() {

	} 

    public RefreshNotebooks() {

	}

}