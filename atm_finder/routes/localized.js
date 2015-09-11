'use strict';

var express = require('express');
var traverse = require('traverse');
var router = express.Router();

var Localized = require('./../models/localized');

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

/* GET the localized object. */
router.get('/:code', function(req, res) {

	var code = req.params.code;

	if (availableLanguages.indexOf(code) === -1) {
		var err = new Error('Language Code should be either "zh" or "en"');
		err.status = 400;
		res.send(err);
	} else {
		Localized.find({}, {
			_id: 0
		}, function(err, localized) {
			if (err) {
				res.send(err);
			} else {
				res.send(filter_language(code, localized));
			}
		});
	}
});

module.exports = router;