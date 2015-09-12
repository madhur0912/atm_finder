'use strict';

var express = require('express');
var traverse = require('traverse');
var router = express.Router();

var Atm = require('./../models/atm');

var maxResultSize = 30;
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

var distanceFromPoint = function(lat1, lon1, lat2, lon2, unit) {
	var radlat1 = Math.PI * lat1 / 180
	var radlat2 = Math.PI * lat2 / 180
	var radlon1 = Math.PI * lon1 / 180
	var radlon2 = Math.PI * lon2 / 180
	var theta = lon1 - lon2
	var radtheta = Math.PI * theta / 180
	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	dist = Math.acos(dist)
	dist = dist * 180 / Math.PI
	dist = dist * 60 * 1.1515
	if (unit == "K") {
		dist = dist * 1.609344
	}
	if (unit == "N") {
		dist = dist * 0.8684
	}
	return dist
}

var atmQuery = function(code, center, atm_type, shop_type, callback) {

	var find = {
		loc: {
			$near: {
				$geometry: {
					type: 'Point',
					coordinates: center
				}
			}
		}
	};

	if (atm_type !== null) {
		find.atm_type = atm_type;
	}

	if (shop_type !== null) {
		find.shop_type = shop_type;
	}

	Atm
		.find(find)
		.limit(maxResultSize)
		.select({
			_id: 1,
			atm_type: 1,
			name: 1,
			shop_type: 1,
			loc: 1
		})
		.then(function(data) {
			callback(null, filter_language(code, data));
		});
}

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
			return (b.atm_type.localeCompare(a.atm_type));
		})

		res.send({
			shop_type: results
		});
	});
});

/* GET all atm inside area. */
router.get('/near/:code/center/:center', function(req, res) {

	var code = req.params.code;
	if (availableLanguages.indexOf(code) === -1) {
		var err = new Error('Language Code should be either "zh" or "en"');
		err.status = 400;
		res.send(err);
	} else {
		var center = JSON.parse('[' + req.params.center + ']');
		center = [center[1], center[0]];

		atmQuery(code, center, null, null, function(err, atms) {
			res.send({
				atm: atms
			});
		})
	}
});

/* GET all atm inside area with atm_type filter. */
router.get('/near/:code/center/:center/atm_type/:atm_type', function(req, res) {

	var code = req.params.code;

	if (availableLanguages.indexOf(code) === -1) {
		var err = new Error('Language Code should be either "zh" or "en"');
		err.status = 400;
		res.send(err);
	} else {
		var atm_type = req.params.atm_type;
		var center = JSON.parse('[' + req.params.center + ']');
		center = [center[1], center[0]];

		atmQuery(code, center, atm_type, null, function(err, atms) {
			res.send({
				atm: atms
			});
		})
	}
});

/* GET all atm inside area with shop_type filter. */
router.get('/near/:code/center/:center/shop_type/:shop_type', function(req, res) {

	var code = req.params.code;

	if (availableLanguages.indexOf(code) === -1) {
		var err = new Error('Language Code should be either "zh" or "en"');
		err.status = 400;
		res.send(err);
	} else {
		var shop_type = req.params.shop_type;
		var center = JSON.parse('[' + req.params.center + ']');
		center = [center[1], center[0]];

		atmQuery(code, center, null, shop_type, function(err, atms) {
			res.send({
				atm: atms
			});
		})
	}
});

module.exports = router;