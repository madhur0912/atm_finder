var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

	req.db.get('atm').find({}, function(err, data) {
		if (err) {
			res.send(err);
		} else {
			res.send(data);
		}
	})
});

module.exports = router;