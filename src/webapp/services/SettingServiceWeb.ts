
import {iSettingService} 		from 'webapp/services/iSettingService';
import {NotebookStub} 			from 'lib/Notebook';

import {Injectable, NgZone, OnInit}     from '@angular/core';
import {Http} 					from '@angular/http';
import {Observable}     		from 'rxjs/Observable';
import {Observer}     			from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
//import 'rxjs/add/observable/just';

@Injectable()
export class SettingService implements iSettingService, OnInit {

	public notebooks : NotebookStub[];
	public notebooks$ : Observable<NotebookStub[]>;
	// private notebookObserver : Observer<NotebookStub[]>;

	constructor(private http : Http ) {
		this.notebooks = new Array<NotebookStub>();

		this.GetNotebooks();
	}

	ngOnInit() {
		this.notebooks$.subscribe( 
			value => { this.notebooks = value; },
			error => { console.log(error) },
			() => {console.log('complete')}  
		);
		
		// this.notebookObservable = Observable.just( )
		// this.notebookObservable = Observable.from(this.notebooks) as Observable<NotebookStub[]>;
	}

	private cnn = {
		protocol: 'http',
		host: 'localhost',
		port: 3333
	}

	//private ProtocolType : enum { http, https }

	//import url from json

	private url = `${this.cnn.protocol}://${this.cnn.host}:${this.cnn.port}/api/Notebooks`;

	public CreateNotebook  ( stub: NotebookStub ) {
		this.http.post(this.url, NotebookStub)
			.toPromise()
			.then( () => { this.GetNotebooks() } );
	}

    public DeleteNotebook( argId ) {
		this.http.delete(this.url, [{ id: argId }])
			.toPromise()
			.then( () => { this.GetNotebooks() } );				
	}
		
    public GetNotebooks() {
		console.log('SettingServiceWeb.getNotebooks');
		this.notebooks$ = this.http.get(this.url)
			.map( (res) => { return res.json(); });
	}	

	public GetNotebook(argId : string) {
		//this.http.get(url, [{id: argId}]);
	}
}