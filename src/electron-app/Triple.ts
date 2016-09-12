

export class TriplePackage {
	public triple : Triple;
	public action : string;

	constructor( _act, _trip, _s, _o, _p ) {
		this.action = _act;
		if ( _trip ) this.triple = _trip;
		else if ( _s || _o || _p ) {
			this.triple = new Triple(_s, _o, _p);
		}
	}
}

export class Triple {
	public subject : string = '';
	public object : string = '';
	public predicate : string = '';

	public static actions = {
		put: 'put',
		get: 'get',
		del: 'del'
	}

	constructor ( s : string, o : string, p : string )
	{
		this.subject = s;
		this.object = o;
		this.predicate = p;
	}

	public basicTriple() : any {
		return { subject: this.subject, object: this.object, predicate: this.predicate };
	}

	public exportLevelGraph(action : string) {
		var basic = this.basicTriple();
		var s = this.subject, p = this.predicate, o = this.object;
		return [
			{ key: `spo::${s}::${p}::${o}`, value: basic, type: action },
			{ key: `sop::${s}::${o}::${p}`, value: basic, type: action },
			{ key: `ops::${o}::${p}::${s}`, value: basic, type: action },
			{ key: `osp::${o}::${s}::${p}`, value: basic, type: action },
			{ key: `pso::${p}::${s}::${o}`, value: basic, type: action },
			{ key: `pos::${p}::${o}::${s}`, value: basic, type: action }
		];
	}
}
