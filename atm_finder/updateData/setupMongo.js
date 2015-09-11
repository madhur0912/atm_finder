'use strict';

var fs = require('fs');

// Setup mongodb
var Promise = require('bluebird');
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
var assert = require('assert');
var dbName = 'atm';
var dbPath = 'localhost';

var atmCollectionName = 'atm';
var localizedCollectionName = 'localized';

var circleK = require('./circleKBranch/app');
var hangseng = require('./hangsengBranch/app');
var hsbc = require('./hsbcBranch/app');
var jetco = require('./jetcoBranch/app');
var manning = require('./manningsBranch/app');
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
var createCollectionWithName = function(name) {
	return new Promise(function(resolve, reject) {

		db.collection(name).drop(function(err, reply) {
			if (err) {
				console.log('Error: ' + err);
			} else {
				console.log('Mongo: Drop collection "' + name + '" : ' + reply);
			}

			db.createCollection(name, {}, function(err, collection) {
				if (err) {
					reject(err);
				} else {
					resolve(collection);
				}
			});
		});
	});
};

// Function to insert all branches to collection
var insertLocalizedToCollection = function() {
	return new Promise(function(resolve, reject) {

		var filename = localizedCollectionName + '.json'
		var localized = JSON.parse(fs.readFileSync(filename, 'utf8'));

		db.collection(localizedCollectionName).insertOne(localized, function(err, result) {

			if (err) {
				reject(err);
			} else {
				resolve(result);
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
				var bulk = db.collection(atmCollectionName).initializeUnorderedBulkOp();
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

var createGeoIndex = function() {
	// db.atm.createIndex( { loc : "2dsphere" } )
	return new Promise(function(resolve, reject) {
		db.collection(atmCollectionName).createIndex({
			loc: '2dsphere'
		}, function(err, result) {
			if (err) {
				reject(err);
			}

			resolve(result);
		});
	});
};

// Establish connection to db
db.open(function(err, db) {
	assert.equal(null, err);

	var insertLocalized = Promise
		.map([localizedCollectionName], createCollectionWithName)
		.then(insertLocalizedToCollection)
		.then(function() {
			console.log('SetupMongo: Insert localized Finish.');
		})
		.catch(function(err) {
			console.log(err);
		});

	var insertAtm = Promise
		.map([atmCollectionName], createCollectionWithName)
		.then(insertAtmToCollection)
		.then(createGeoIndex)
		.then(function(result) {
			console.log('SetupMongo: Insert ATM Finish.');
			console.log('SetupMongo: ATM Index Finish - ' + result + '.');
		})
		.catch(function(err) {
			console.log(err);
		});

	Promise
		.all([insertLocalized, insertAtm])
		.then(function() {
			console.log('SetupMongo: Setup Mongo complete. Close db.');
			db.close();
		});
});