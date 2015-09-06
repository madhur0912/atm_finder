var fs = require('fs');

// Database
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/atm');

var count = 0;
var arr = [];

var searchNearby = function(branch, index, length) {

	db.get('atm').find({
		'loc': {
			$near: {
				$geometry: {
					type: 'Point',
					coordinates: branch.loc
				},
				$maxDistance: 1
			}
		}
	}, function(err, data) {
		//console.log(data)
		if (data.length > 1) {
			arr.push(data);
		};

		console.log(++count + ' / ' + length);

		if (count === length) {
			db.close();

			var content = 'Length = ' + arr.length + '\n';

			for (var i = 0; i < arr.length; i++) {
				content += '\n------------------------------------------------------------------------------\n';
				content += JSON.stringify(arr[i],0,4);
			};

			fs.writeFileSync('nearby.json', content, 'utf-8');
		};
	});
}

db.get('atm').find({}, function(err, data) {
	if (err) {
		res.send(err);
	} else {
		for (var i = 0; i < data.length; i++) {

			//console.log(data[i])
			searchNearby(data[i], i, data.length);
		};
	}
});