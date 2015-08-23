'use strict';

/**
 * Download all 7-11 branch infos, parse it and save to branches.json
 */
var Promise = require('bluebird');
var request = require('request');
var fs = require('fs');

var dataDir = __dirname + '/data/';
var url = 'http://www.7-eleven.com.hk/services/map.aspx?cmd=get_stores&seq=1439882553824&ne_lat=22.601131347937162&ne_lng=114.63728922570795&sw_lat=22.093072225084036&sw_lng=113.35875529016107&ss_id=&is_24x7=';

// Branch Object
function Branch(branch) {
	this._id = 'SEVEN_' + branch.id;
	this.atm_type = 'eps';
	this.name = {
		zh: '7-11便利店',
		en: '7-Eleven'
	};
	this.shop_type = '7-11';
	this.area = {
		zh: branch.distr.name.tc,
		en: branch.distr.name.en
	};
	this.district = {
		zh: branch.distr.name.tc,
		en: branch.distr.name.en
	};
	this.address = {
		zh: branch.addr.tc,
		en: branch.addr.en
	};
	this.service = null;
	this.detail = null;
	this.atm24 = branch.hr_247;
	this.loc = [branch.geo.latlng.lng, branch.geo.latlng.lat];

	// Parse workHrs
	if (branch.hr_247) {
		this.workHrs = null;
	} else {
		var wkd = branch.hr_wkd;
		wkd = wkd.substring(0, 0 + 2) + ':' + wkd.substring(2, 2 + 2) + ' - ' + wkd.substring(5, 5 + 2) + ':' + wkd.substring(7, 7 + 2);
		var sat = branch.hr_sat;
		sat = sat.substring(0, 0 + 2) + ':' + sat.substring(2, 2 + 2) + ' - ' + sat.substring(5, 5 + 2) + ':' + sat.substring(7, 7 + 2);
		var sun = branch.hr_sun;
		sun = sun.substring(0, 0 + 2) + ':' + sun.substring(2, 2 + 2) + ' - ' + sun.substring(5, 5 + 2) + ':' + sun.substring(7, 7 + 2);

		this.workHrs = {
			'monday': wkd,
			'tuesday': wkd,
			'wednesday': wkd,
			'thursday': wkd,
			'friday': wkd,
			'saturday': sat,
			'sunday': sun
		};
	}

	this.tel = null;
}

// Get all 7Eleven branches
var getBranches = function() {
	return new Promise(function(resolve, reject) {
		request
			.get(url, function(error, response, body) {

				// Parse string to Object
				body = JSON.parse(body);

				// Save the response body
				saveResponseBody('allStores.json', url, body);

				// Resolve it
				resolve(body.stores);
			})
			.on('error', function(error) {

				// Error
				reject(error);
			});
	});
};

// Save response body
var saveResponseBody = function(filename, url, body) {
	body = '//' + url + '\n' + JSON.stringify(body, 0, 4);
	if (!fs.existsSync(dataDir)) {
		fs.mkdirSync(dataDir);
	}
	fs.writeFileSync(dataDir + filename, body, 'utf-8');

	console.log('7-11: Save ' + filename + ' success!');
};

// Format branches array
var formatBranches = function(branches) {
	return new Promise(function(resolve) {
		for (var i = 0; i < branches.length; i++) {
			branches[i] = new Branch(branches[i]);
		}

		resolve(branches);
	});
};

// Start the promise
var branches = Promise
	.try(getBranches)
	.then(formatBranches)
	.then(function(branches) {
		return new Promise(function(resolve) {

			// Sort branches by longitude
			branches.sort(function(a, b) {
				return a.loc[0] - b.loc[0];
			});

			// Save to branches.json
			fs.writeFileSync(__dirname + '/branches.json', JSON.stringify(branches, 0, 4), 'utf-8');
			console.log('7-11: Save branches.json success!');
			console.log('7-11: Finish.');

			resolve(branches);
		});
	})
	// Error handler
	.catch(function(error) {
		console.log('7-11: ' + error);
	});

module.exports = branches;