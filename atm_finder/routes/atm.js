'use strict';

var express = require('express');
var traverse = require('traverse');
var router = express.Router();

// filter json obj by language
var filter_language = function(language, obj) {
	var result = traverse(obj).map(function(item) {
		if (this.key === language) {
			if (item === null) {
				this.parent.delete();
			} else {
				this.parent.update(item);
			}
		}
	});
	return result;
};

/* GET all atm. */
router.get('/', function(req, res) {

	req.db.get('atm').find({}, function(err, data) {
		if (err) {
			res.send(err);
		} else {
			res.send({
				atm: data
			});
		}
	});
});

/* GET all atm inside area. */
router.get('/:code/bottomLeft/:bottomLeft/upperRight/:upperRight', function(req, res) {

	var code = req.params.code;
	var bottomLeft = JSON.parse('[' + req.params.bottomLeft + ']');
	var upperRight = JSON.parse('[' + req.params.upperRight + ']');

	var box = [
		[bottomLeft[1], bottomLeft[0]],
		[upperRight[1], upperRight[0]]
	];

	req.db.get('atm').find({
		shop_type: 'hsbc',
		loc: {
			$geoWithin: {
				$box: box
			}
		}
	}, function(err, data) {
		if (err) {
			res.send(err);
		} else {
			res.send({
				atm: filter_language(code, data)
			});
		}
	});
});

module.exports = router;