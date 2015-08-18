'use strict';

/**
 * Download all Jetco ATM infos, parse it and save to branches.json
 *
 * Example link:
 * http://www.jetco.com.hk/tc/xml/atm/2_1_10_0_atmDetails.xml
 * Please take a look at the HTML structure before reading the code.
 */
var Promise = require('bluebird');
var fs = require('fs');
var $ = require('cheerio');
var request = require('request');

var dataDir = __dirname + '/data/';
var baseURLZh = 'http://www.jetco.com.hk/tc/xml/atm/';
var baseURLEn = 'http://www.jetco.com.hk/en/xml/atm/';
var areaPath = '2_atmArea.xml';
var districtPath = 'AREA.ID_atmDistrict.xml';
var detailPath = '2_AREA.ID_DISTRICT.ID_0_atmDetails.xml';

// Area Object
function Area(area_id, district_ids) {
	this.area_id = area_id;
	this.district_ids = district_ids;
}

// Branch Object
function Branch(atm, en) {
	this.atm_type = 'jetco';
	this.name = {
		zh: $(atm).find('ob_name').text(),
		en: $(en).find('ob_name').text()
	};
	this.bank_type = this.name.zh.substring(0, this.name.zh.indexOf('銀行') + 2);
	this.area = {
		zh: $(atm).find('aarea').text(),
		en: $(en).find('aarea').text()
	};
	this.district = {
		zh: $(atm).find('district').text(),
		en: $(en).find('district').text()
	};
	this.address = {
		zh: $(atm).find('addr').text(),
		en: $(en).find('addr').text()
	};
	this.service = {
		zh: $(atm).find('supp_tran').text().trim(),
		en: $(en).find('supp_tran').text().trim()
	};
	this.detail = null;
	this.atm24 = true;
	this.loc = [parseFloat($(atm).find('longitude').text()), parseFloat($(atm).find('latitude').text())];
	this.workHrs = null;
	this.tel = null;
}

// Function to flatten an array
var flattenArray = function(array) {
	return [].concat.apply([], array);
};

// Return Promise of array of area_id
var getAreaIds = function() {
	return new Promise(function(resolve, reject) {
		var currentURL = baseURLZh + areaPath;

		// Start the request
		request
			.get(currentURL, function(error, response, body) {

				// Save the response body
				saveResponseBody(areaPath, currentURL, body);

				// Use cheerio to find all <area_id>
				var area_ids = [];
				$(body).find('atm_areas').find('area_id').map(function(index, element) {
					area_ids.push($(element).text());
				});

				// Resolve it
				resolve(area_ids);
			})
			.on('error', function(error) {

				// Error
				reject(error);
			});
	});
};

// Input array of area_id, return array of Area Objects
var getAllDistrictIds = function(area_ids) {
	return Promise.map(area_ids, getDistrictIdsFromArea);
};

// Input area_id, return the Promise of Area Object
var getDistrictIdsFromArea = function(area_id) {
	return new Promise(function(resolve, reject) {

		// Setup the URL
		var currentDistrictPath = districtPath.replace('AREA.ID', area_id);
		var currentURL = baseURLZh + currentDistrictPath;

		// Start the request
		request
			.get(currentURL, function(error, response, body) {

				// Save the response body
				saveResponseBody(currentDistrictPath, currentURL, body);

				// Use cheerio to find all <district_id>
				var district_ids = [];
				$(body).find('atm_districts').find('district_id').map(function(index, element) {
					district_ids.push($(element).text());
				});

				// Resolve it
				resolve(new Area(area_id, district_ids));
			})
			.on('error', function(error) {

				// Error
				reject(error);
			});
	});
};

// Input array of Area Objects, return Promise of array of all branches
var getAllBranches = function(areas) {

	// For each area, 
	return Promise.map(areas, function(area) {

		// For each district,
		return Promise.map(area.district_ids, function(district_id) {

			// Return the Promise of array of branches
			return getBranchesWithAreaAndDistricts(area.area_id, district_id);
		}).then(flattenArray);
	}).then(flattenArray);
};

// Input area_id and district_id, return Promise of array of branches
var getBranchesWithAreaAndDistricts = function(area_id, district_id) {
	return new Promise(function(resolve, reject) {
		var currentDetailPath = detailPath.replace('AREA.ID', area_id).replace('DISTRICT.ID', district_id);
		var currentURLZh = baseURLZh + currentDetailPath;
		var currentURLEn = baseURLEn + currentDetailPath;
		// Start the request
		request
			.get(currentURLZh, function(error, response, body) {

				// Save the response body
				saveResponseBody(currentDetailPath + '.zh', currentURLZh, body);

				// Replace 'area' with 'aarea' in body,
				// since cheerio cannot find <area>
				body = body.replace(/area/g, 'aarea');

				// Use cheerio to find all <atm>
				var atms = $(body).find('atms').find('atm');

				// Get en version
				request
					.get(currentURLEn, function(errorEn, responseEn, bodyEn) {

						// Save the response body
						saveResponseBody(currentDetailPath + '.en', currentURLEn, bodyEn);

						// Replace 'area' with 'aarea' in body,
						// since cheerio cannot find <area>
						bodyEn = bodyEn.replace(/area/g, 'aarea');

						// Use cheerio to find all <atm>
						var atmsEn = $(bodyEn).find('atms').find('atm');

						// Format all branches in this district
						var branchesInDistrict = [];
						for (var i = 0; i < atms.length; i++) {

							// For each atm,
							// Find the en version
							var enIndex = -1;
							var id = $(atms[i]).attr('id');
							for (var j = 0; j < atmsEn.length; j++) {
								if ($(atmsEn[j]).attr('id') === id) {
									enIndex = j;
									break;
								}
							};

							// Construct the branch object
							// Add branch to branchesInDistrict
							branchesInDistrict.push(new Branch(atms[i], atmsEn[enIndex]));
						}


						// Resolve it
						resolve(branchesInDistrict);
					})
					.on('error', function(error) {
						reject(error);
					});
			})
			.on('error', function(error) {
				// Error
				reject(error);
			});
	});
};

// Save response body
var saveResponseBody = function(filename, url, body) {
	body = '<!-- ' + url + '-->\n' + body;
	if (!fs.existsSync(dataDir)) {
		fs.mkdirSync(dataDir);
	}
	fs.writeFileSync(dataDir + filename, body, 'utf-8');

	console.log('Jetco: Save ' + filename + ' success!');
};

// Start the promise
var branches = Promise
	// Get an array of area_ids
	.try(getAreaIds)
	// Input area_ids, return array of Area Objects
	.then(getAllDistrictIds)
	// Input array of Area Objects, return array of Branch Objects
	.then(getAllBranches)
	// Save to json
	.then(function(branches) {
		return new Promise(function(resolve) {
			//console.log(JJetco: SON.stringify(branches, 0, 4));

			var banks = [];
			for (var i = 0; i < branches.length; i++) {
				if (banks.indexOf(branches[i].name) === -1) {
					banks.push(branches[i].name);
				}
			}

			// Sort branches by longitude
			branches.sort(function(a, b) {
				return a.loc[0] - b.loc[0];
			});

			fs.writeFileSync(__dirname + '/banks.json', JSON.stringify(banks, 0, 4), 'utf-8');
			fs.writeFileSync(__dirname + '/branches.json', JSON.stringify(branches, 0, 4), 'utf-8');
			console.log('Jetco: Save branches.json success!');
			console.log('Jetco: Resolve branches.');

			resolve(branches);
		});
	})
	// Error handler
	.catch(function(error) {
		console.log('Jetco: ' + error);
	});

// Exports the promise with branches
module.exports = branches;