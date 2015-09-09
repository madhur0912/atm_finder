'use strict';

var express = require('express');
var traverse = require('traverse');
var router = express.Router();

var Atm = require('./../models/atm');

var availableLanguages = ['zh', 'en'];

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
router.get('/all/:code', function(req, res) {

	var code = req.params.code;

	if (availableLanguages.indexOf(code) === -1) {
		var err = new Error('Language Code should be either "zh" or "en"');
		err.status = 400;
		res.send(err);
	} else {
		Atm.find(function(err, atms) {
			if (err) {
				res.send(err);
			} else {
				res.send({
					atm: filter_language(code, atms)
				});
			}
		});
	}
});

router.get('/shop_type', function(req, res) {
	var group = {
		key: {
			atm_type: 1
		},
		cond: {},
		reduce: function(doc, out) {
			if (out.shop_types.indexOf(doc.shop_type) === -1) {
				out.shop_types.push(doc.shop_type);
			}
		},
		initial: {
			shop_types: []
		}
	};

	Atm.collection.group(group.key, group.cond, group.initial, group.reduce, true, function(err, results) {

		results.sort(function(a, b) {
			console.log('a = ' + a.atm_type[0]);
			console.log('b = ' + b.atm_type[0]);
			console.log(b.atm_type[0] - a.atm_type[0]);

			return (b.atm_type.localeCompare(a.atm_type));
		})

		console.log(results);

		res.send({
			shop_type: results
		});
	});
});

/* GET all atm inside area. */
router.get('/box/:code/bottomLeft/:bottomLeft/upperRight/:upperRight', function(req, res) {

	var code = req.params.code;
	if (availableLanguages.indexOf(code) === -1) {
		var err = new Error('Language Code should be either "zh" or "en"');
		err.status = 400;
		res.send(err);
	} else {
		var bottomLeft = JSON.parse('[' + req.params.bottomLeft + ']');
		var upperRight = JSON.parse('[' + req.params.upperRight + ']');

		var box = [
			[bottomLeft[1], bottomLeft[0]],
			[upperRight[1], upperRight[0]]
		];

		Atm
			.find({
				loc: {
					$geoWithin: {
						$box: box
					}
				}
			})
			.select({
				_id: 1,
				atm_type: 1,
				name: 1,
				shop_type: 1,
				loc: 1
			})
			.then(function(data) {
				res.send({
					atm: filter_language(code, data)
				});
			});
	}
});

// /* GET all atm inside area with filter. */
// router.get('/box/:code/bottomLeft/:bottomLeft/upperRight/:upperRight/atm_type/:atm_type/shop_type/:shop_type', function(req, res) {

// 	var code = req.params.code;
// 	if (availableLanguages.indexOf(code) === -1) {
// 		var err = new Error('Language Code should be either "zh" or "en"');
// 		err.status = 400;
// 		res.send(err);
// 	} else {
// 		var bottomLeft = JSON.parse('[' + req.params.bottomLeft + ']');
// 		var upperRight = JSON.parse('[' + req.params.upperRight + ']');

// 		var box = [
// 			[bottomLeft[1], bottomLeft[0]],
// 			[upperRight[1], upperRight[0]]
// 		];

// 		Atm
// 			.find({
// 				loc: {
// 					$geoWithin: {
// 						$box: box
// 					}
// 				}
// 			})
// 			.select({
// 				_id: 1,
// 				atm_type: 1,
// 				name: 1,
// 				shop_type: 1,
// 				loc: 1
// 			})
// 			.then(function(data) {
// 				res.send({
// 					atm: filter_language(code, data)
// 				});
// 			});
// 	}
// });

module.exports = router;