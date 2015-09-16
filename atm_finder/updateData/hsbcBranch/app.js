'use strict';

/**
 * Download all HSBC branch infos, parse it and save to branches.json
 */
var Promise = require('bluebird');
var request = require('request');
var fs = require('fs');

var dataDir = __dirname + '/data/';
var url = 'https://www.hsbc.com.hk/gpib/channel/proxy/abslSvc/enqBranchABSL';

// Base request data, which enclose HK region
var requestData = {
	'countryCode': 'HK',
	'locale': 'zh-hk',
	'locationTypes': [{
		'locationType': 'ssb' //only search ssb, means ATM
	}],
	'services': [{
		'service': 'show-all-results'
	}],
	'cLat': 22.397467790332893,
	'cLng': 114.13346995736697,
	'bottomLeftLat': 22.044683115235397,
	'bottomLeftLng': 113.58415355111697,
	'topRightLat': 22.749359536368125,
	'topRightLng': 114.68278636361697
};

// Function to flatten an array
var flattenArray = function(array) {
	return [].concat.apply([], array);
};

// Input requestData
// Return the topLeft requestData
var toTopLeft = function(requestData) {
	var topLeft = JSON.parse(JSON.stringify(requestData));

	// TOP LEFT
	topLeft.bottomLeftLng = requestData.bottomLeftLng;
	topLeft.topRightLng = requestData.cLng;
	topLeft.bottomLeftLat = requestData.cLat;
	topLeft.topRightLat = requestData.topRightLat;
	topLeft.cLat = (topLeft.bottomLeftLat + topLeft.topRightLat) / 2.0;
	topLeft.cLng = (topLeft.bottomLeftLng + topLeft.topRightLng) / 2.0;

	return topLeft;
};

// Input requestData
// Return the topRight requestData
var toTopRight = function(requestData) {
	var topRight = JSON.parse(JSON.stringify(requestData));

	// TOP RIGHT
	topRight.bottomLeftLat = requestData.cLat;
	topRight.bottomLeftLng = requestData.cLng;
	topRight.cLat = (topRight.topRightLat + topRight.bottomLeftLat) / 2.0;
	topRight.cLng = (topRight.topRightLng + topRight.bottomLeftLng) / 2.0;

	return topRight;
};

// Input requestData
// Return the bottomLeft requestData
var toBottomLeft = function(requestData) {
	var bottomLeft = JSON.parse(JSON.stringify(requestData));

	// BOTTOM LEFT
	bottomLeft.topRightLat = requestData.cLat;
	bottomLeft.topRightLng = requestData.cLng;
	bottomLeft.cLat = (bottomLeft.topRightLat + bottomLeft.bottomLeftLat) / 2.0;
	bottomLeft.cLng = (bottomLeft.topRightLng + bottomLeft.bottomLeftLng) / 2.0;

	return bottomLeft;
};

// Input requestData
// Return the bottomRight requestData
var toBottomRight = function(requestData) {
	var bottomRight = JSON.parse(JSON.stringify(requestData));

	// BOTTOM RIGHT
	bottomRight.bottomLeftLng = requestData.cLng;
	bottomRight.topRightLng = requestData.topRightLng;
	bottomRight.bottomLeftLat = requestData.bottomLeftLat;
	bottomRight.topRightLat = requestData.cLat;
	bottomRight.cLat = (bottomRight.bottomLeftLat + bottomRight.topRightLat) / 2.0;
	bottomRight.cLng = (bottomRight.bottomLeftLng + bottomRight.topRightLng) / 2.0;

	return bottomRight;
};

// Constructor of Branch
// Input a HSBC branch json, return a Branch Object
function Branch(branch) {

	// console.log(branch.hasOwnProperty('addInfo'));
	// console.log(JSON.stringify(branch, 0, 4));

	// Set basic key-value
	this._id = 'HSBC_' + branch.locationId;
	this.atm_type = 'hsbcgroup';
	this.shop_type = 'hsbc';
	this.name = {
		zh: branch.name,
		en: branch.en.name
	};
	this.area = {
		zh: branch.address.prov,
		en: branch.en.address.prov
	};
	this.district = {
		zh: branch.address.city,
		en: branch.en.address.city
	};
	this.address = {
		zh: branch.address.line1,
		en: branch.en.address.line1
	};
	this.loc = [parseFloat(branch.address.lng), parseFloat(branch.address.lat)];

	// Set workHrs
	this.workHrs = null;
	var lobbyWorkingHourValid = JSON.stringify(branch.workHrs.lobby).indexOf(' - ') != -1;
	var driveThruWorkingHourValid = (JSON.stringify(branch.workHrs.driveThru).indexOf(' - ') != -1) && (JSON.stringify(branch.workHrs.driveThru).indexOf('00:00 - 23:59') === -1);

	if (lobbyWorkingHourValid && driveThruWorkingHourValid) {
		if (JSON.stringify(branch.workHrs.lobby) === JSON.stringify(branch.workHrs.driveThru)) {
			this.workHrs = branch.workHrs.lobby;
		} else {
			this.workHrs = null;
		}
	} else if (lobbyWorkingHourValid) {
		this.workHrs = branch.workHrs.lobby;
	} else if (driveThruWorkingHourValid) {
		this.workHrs = branch.workHrs.driveThru;
	}

	// Set atm24
	var stringify = JSON.stringify(branch);
	this.atm24 = (stringify.indexOf('00:00 - 23:59') != -1) || (stringify.indexOf('24小時') != -1);

	// Set service
	var serviceStringZh = '';
	for (var j = 0; j < branch.services.length; j++) {
		serviceStringZh = serviceStringZh + branch.services[j].service + '\n';
	}
	// Set service
	var serviceStringEn = '';
	for (var j = 0; j < branch.en.services.length; j++) {
		serviceStringEn = serviceStringEn + branch.en.services[j].service + '\n';
	}

	var detailStringZh = branch.addInfo !== null ? branch.addInfo.callOutText + '\n' : null;
	var detailStringEn = branch.en.addInfo !== null ? branch.en.addInfo.callOutText + '\n' : null;

	if (detailStringZh !== null) {
		serviceStringZh = detailStringZh + serviceStringZh.trim();
	}
	if (detailStringEn !== null) {
		serviceStringEn = detailStringEn + serviceStringEn.trim();
	}

	var detail = null;

	this.service = {
		zh: serviceStringZh.trim(),
		en: serviceStringEn.trim()
	};

	this.tel = null;
}

// Save response body
var saveResponseBody = function(filename, postData, body) {
	var text = JSON.stringify(postData, 0, 4) + ',\n' + JSON.stringify(body, 0, 4);
	if (!fs.existsSync(dataDir)) {
		fs.mkdirSync(dataDir);
	}
	fs.writeFileSync(dataDir + filename, text, 'utf-8');

	console.log('HSBC: Save ' + filename + ' success!');
};

// Input a requestData,
// recursively find branches inside,
// return the Promise of array of branches
var findBranches = function(requestData, route) {

	console.log('HSBC: Finding branches in ' + route);

	return new Promise(function(resolve, reject) {
		var postData = {
			url: url,
			method: 'POST',
			json: true,
			headers: {
				'content-type': 'application/json',
			},
			body: requestData
		};

		request(postData, function(error, response, body) {

			if (error) {
				if (error.code === 'ECONNRESET') {
					console.log('HSBC: ECONNRESET Retry request');
					resolve(findBranches(requestData, route));
				}
			} else if (body.exceedMaximum) {

				// If result exceed maximum (> 20)
				// Cut it to 4 part and recursively find branches
				// Resolve the results

				var topLeft = findBranches(toTopLeft(requestData), route + '.topLeft');
				var topRight = findBranches(toTopRight(requestData), route + '.topRight');
				var bottomLeft = findBranches(toBottomLeft(requestData), route + '.bottomLeft');
				var bottomRight = findBranches(toBottomRight(requestData), route + '.bottomRight');

				resolve(Promise.join(topLeft, topRight, bottomLeft, bottomRight,
					function(topLeft, topRight, bottomLeft, bottomRight) {
						return flattenArray([topLeft, topRight, bottomLeft, bottomRight]);
					}));

			} else {

				// If result not exceed maximum (<= 20)
				// Save the result
				saveResponseBody(route + '.Zh.json', postData, body);

				// Find En version
				var postDataEn = JSON.parse(JSON.stringify(postData));
				postDataEn.body.locale = 'zh-en';
				request(postDataEn, function(errorEn, responseEn, bodyEn) {

					// If error, find it again
					if (errorEn) {
						if (errorEn.code === 'ECONNRESET') {
							console.log('HSBC: ECONNRESET Retry request');
							resolve(findBranches(requestData, route));
						}
					} else {

						// Save the result
						saveResponseBody(route + '.En.json', postDataEn, bodyEn);

						var resultZh = body.results;
						var resultEn = bodyEn.results;

						for (var i = 0; i < resultZh.length; i++) {
							for (var j = 0; j < resultEn.length; j++) {
								if (resultZh[i].locationId === resultEn[j].locationId) {
									resultZh[i].en = resultEn[j];
									resultEn.splice(j, 1);
									break;
								}
							}
						}

						// Resolve it
						resolve(resultZh);
					}
				});
			}
		}).on('error', function(error) {

			// Error
			reject(error);
		});
	});
};

// Input array of unformated branches
// return the Promise of array of formated branches
var formatBranches = function(branches) {
	return new Promise(function(resolve) {

		// Format all branches
		var formated = [];
		for (var i = 0; i < branches.length; i++) {
			formated.push(new Branch(branches[i]));
		}

		// Resolve the formated branches
		resolve(formated);
	});
};

// Start the recursion
var branches = Promise
	.join(requestData, 'base', findBranches)
	.then(formatBranches)
	.then(function(branches) {
		return new Promise(function(resolve) {

			// Sort branches by longitude
			branches.sort(function(a, b) {
				return a.loc[0] - b.loc[0];
			});

			// Save to branches.json
			fs.writeFileSync(__dirname + '/branches.json', JSON.stringify(branches, 0, 4), 'utf-8');
			console.log('HSBC: Save branches.json success!');
			console.log('HSBC: Finish.');

			resolve(branches);
		});
	})
	// Error handler
	.catch(function(error) {
		console.log('HSBC: ' + error);
	});

// Exports the promise with branches
module.exports = branches;