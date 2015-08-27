var express = require('express');
var router = express.Router();

/* GET all atm. */
router.get('/', function(req, res, next) {

	req.db.get('atm').find({}, function(err, data) {
		if (err) {
			res.send(err);
		} else {
			res.send({
				atm: data
			})
		}
	})
});

/* GET all atm inside area. */
router.get('/bottomLeft/:bottomLeft/upperRight/:upperRight', function(req, res, next) {

	var bottomLeft = JSON.parse('[' + req.params.bottomLeft + ']');
	var upperRight = JSON.parse('[' + req.params.upperRight + ']');

	var box = [
		[bottomLeft[1], bottomLeft[0]],
		[upperRight[1], upperRight[0]]
	];

	req.db.get('atm').find({
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
				atm: data
			})
		}
	})
});

module.exports = router;