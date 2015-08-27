'use strict';

// Setup mongodb
var Promise = require('bluebird');
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
var assert = require('assert');
var dbName = 'atm';
var dbPath = 'localhost';

var circleK = require('./circleKBranch/app');
var hangseng = require('./hangsengBranch/app');
var hsbc = require('./hsbcBranch/app');
var jetco = require('./jetcoBranch/app');
var manning = require('./manningBranch/app');
var seven = require('./sevenBranch/app');
var watsons = require('./watsonsBranch/app');

if (process.argv.length >= 3) {
	dbPath = process.argv[2];
}

// Get the db
var db = new Db(dbName, new Server(dbPath, 27017));

// Function to flatten an array
var flattenArray = function(array) {
	return [].concat.apply([], array);
};

// Function to create the atm collection
var createAtmCollection = function() {
	return new Promise(function(resolve, reject) {
		db.createCollection('atm', {}, function(err, collection) {
			if (err) {
				reject(err);
			} else {
				resolve(collection);
			}
		});
	});
};

// Function to insert all branches to collection
var insertAtmToCollection = function(collection) {
	return new Promise(function(resolve, reject) {
		var allBranches = [
			circleK,
			hangseng,
			hsbc,
			jetco,
			manning,
			seven,
			watsons
		];

		Promise
			.all(allBranches)
			.then(flattenArray)
			.then(function(branches) {
				var bulk = collection.initializeUnorderedBulkOp();
				branches.map(function(branch) {
					bulk.insert(branch);
				});
				bulk.execute(function(err, result) {
					if (err) {
						reject(err);
					}

					resolve(result);
				});
			})
			.catch(function(err) {
				console.log(err);
				reject(err);
			});
	});
};

// Establish connection to db
db.open(function(err, db) {
	assert.equal(null, err);

	Promise
		.try(createAtmCollection)
		.then(insertAtmToCollection)
		.then(function(result) {
			console.log('Insert Finish');
			console.log(result);
			db.close();
		})
		.catch(function(err) {
			console.log(err);
		});
});