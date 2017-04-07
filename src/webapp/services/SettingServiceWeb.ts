
import {iSettingService} 		from 'jadenotes/webapp/services/iSettingService';
import {NotebookStub} 			from 'jadenotes/lib/Notebook';

import {Injectable, NgZone}     from '@angular/core';
import {Jsonp} 					from '@angular/http';
import {Observable}     		from 'rxjs/Observable';
import {Observer}     			from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class SettingService implements iSettingService {
	private _jsonp : Jsonp;

	constructor(jsonpDep : Jsonp ) {
		this._jsonp = jsonpDep;
	}

	public notebooks : NotebookStub[];

	public notebookObservable : Observable<NotebookStub[]>;
	private notebookObserver : Observer<NotebookStub[]>;

	private cnn = {
		protocol: 'http',
		host: 'localhost'
	}

	//private ProtocolType : enum { http, https }

	//import url from json

	private url = `${this.cnn.protocol}${this.cnn.host}//Settings//Notebooks`

	public CreateNotebook ( stub: NotebookStub ) {
		let url = `${this.cnn.protocol}://${this.cnn.host}/Settings/Notebooks`;
		this._jsonp.post(url, NotebookStub)
			.toPromise()
			.then( () => {
				this.GetNotebooks();
			});
	}

    public DeleteNotebook( argId ) {
		let url = `${this.cnn.protocol}://${this.cnn.host}/Settings/Notebook`;
		this._jsonp.delete(url, [{ id: argId }])
			.toPromise()
			.then( () => {
				this.GetNotebooks();	
			})
			.catch( (err) => console.log(err) );
	}
	

	// private fetchAll(url) : Observable<NotebookStub[]>
	// {
	// 	return this._jsonp.get(url)
	// 		.map( (res) => { res.json().data as NotebookStub[] });

	// }
	
    public GetNotebooks() {
		let url = `${this.cnn.protocol}://${this.cnn.host}/Settings/Notebooks`;
		this._jsonp.get(url)
			.map( (res) => {
				this.notebooks.length = 0;
				let data : NotebookStub[] = res.json().data as NotebookStub[];
				data.forEach( (val) => {
					this.notebooks.push(val);
				});
			});
	}	

	public GetNotebook(argId : string) {
		let url = `${this.cnn.protocol}://${this.cnn.host}/Settings/Notebooks`;
		this._jsonp.get(url, [{id: argId}]);
	}

}