	
var express = require('express');

var router = express.Router();
	
router.get('/notebooks', function() { getNotebooks() });
router.put('/notebooks', function() { putNotebooks() });
router.patch('/notebooks/:id', function() { patchNotebooks() });

module.exports = router;

function getNotebooks() {
	
}

function putNotebooks() {

}

function patchNotebooks() {

}