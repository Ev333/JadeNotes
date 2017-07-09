	
var express = require('express');

var router = express.Router();

var data = require('./devServer.data');
	
router.get('/api/notebooks', function(req,res) { getNotebooks(req,res) });
router.put('/api/notebooks', function() { putNotebooks() });
router.patch('/api/notebooks/:id', function() { patchNotebooks() });

module.exports = router;

function getNotebooks(req,res) {	

	let n = [];

	for (i=0; i<data.notebooks.length; i++)
	{
		n[i] = { 
			title: data.notebooks[i].title,
			id: 'xxxxx',
			path: 'fakepath'
		}

	}

	res.send(n);
}

function putNotebooks() {
	
}

function patchNotebooks() {

}