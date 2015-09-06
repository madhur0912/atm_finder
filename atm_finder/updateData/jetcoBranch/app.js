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
var patchDir = __dirname + '/patch/';
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
	var enName = $(en).find('ob_name').text();

	this._id = 'JETCO_' + $(atm).attr('id');
	this.atm_type = 'jetco';
	this.name = {
		zh: enNameToShortZhName[enName],
		en: enNameToShortEnName[enName]
	};
	this.shop_type = enNameToShopType[enName];
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

var enNameToShopType = {
	'Standard Chartered Bank (Hong Kong) Limited':'sc',
	'Bank of China (Hong Kong) Limited':'boc',
	'The Bank of East Asia, Limited':'bea',
	'DBS Bank (Hong Kong) Limited':'dbs',
	'Wing Lung Bank Limited':'winglung',
	'Shanghai Commercial Bank Limited':'scb',
	'Bank of Communications Co., Ltd.':'comm',
	'Public Bank (Hong Kong) Limited':'public',
	'OCBC Wing Hang Bank Limited':'ocbc',
	'Dah Sing Bank, Limited':'dahsing',
	'Chong Hing Bank Limited':'chonghing',
	'Nanyang Commercial Bank Limited':'nanyang',
	'Industrial and Commercial Bank of China (Asia) Limited':'icbc',
	'Citibank (Hong Kong) Limited':'citi',
	'China CITIC Bank International Limited':'citic',
	'China Construction Bank (Asia) Corporation Limited':'construct',
	'Fubon Bank (Hong Kong) Limited':'fubon',
	'Chiyu Banking Corporation Limited':'chiyu',
	'Australia and New Zealand Banking Group Limited, Hong Kong Branch':'anz',
	'China Merchants Bank Hong Kong Branch':'cmb'
};

var enNameToShortEnName = {
	'Standard Chartered Bank (Hong Kong) Limited':'Standard Chartered Bank',
	'Bank of China (Hong Kong) Limited':'Bank of China',
	'The Bank of East Asia, Limited':'The Bank of East Asia',
	'DBS Bank (Hong Kong) Limited':'DBS Bank',
	'Wing Lung Bank Limited':'Wing Lung Bank',
	'Shanghai Commercial Bank Limited':'Shanghai Commercial Bank',
	'Bank of Communications Co., Ltd.':'Bank of Communications Co.',
	'Public Bank (Hong Kong) Limited':'Public Bank',
	'OCBC Wing Hang Bank Limited':'OCBC Wing Hang Bank',
	'Dah Sing Bank, Limited':'Dah Sing Bank',
	'Chong Hing Bank Limited':'Chong Hing Bank',
	'Nanyang Commercial Bank Limited':'Nanyang Commercial Bank',
	'Industrial and Commercial Bank of China (Asia) Limited':'Industrial and Commercial Bank of China',
	'Citibank (Hong Kong) Limited':'Citibank',
	'China CITIC Bank International Limited':'China CITIC Bank',
	'China Construction Bank (Asia) Corporation Limited':'China Construction Bank',
	'Fubon Bank (Hong Kong) Limited':'Fubon Bank',
	'Chiyu Banking Corporation Limited':'Chiyu Bank',
	'Australia and New Zealand Banking Group Limited, Hong Kong Branch':'Australia and New Zealand Bank',
	'China Merchants Bank Hong Kong Branch':'China Merchants Bank'
};

var enNameToShortZhName = {
    'Standard Chartered Bank (Hong Kong) Limited':'渣打銀行',
    'Bank of China (Hong Kong) Limited':'中國銀行',
    'The Bank of East Asia, Limited':'東亞銀行',
    'DBS Bank (Hong Kong) Limited':'星展銀行',
    'Wing Lung Bank Limited':'永隆銀行',
    'Shanghai Commercial Bank Limited':'上海商業銀行',
    'Bank of Communications Co., Ltd.':'交通銀行',
    'Public Bank (Hong Kong) Limited':'大眾銀行',
    'OCBC Wing Hang Bank Limited':'華僑永亨銀行',
    'Dah Sing Bank, Limited':'大新銀行',
    'Chong Hing Bank Limited':'創興銀行',
    'Nanyang Commercial Bank Limited':'南洋商業銀行',
    'Industrial and Commercial Bank of China (Asia) Limited':'中國工商銀行',
    'Citibank (Hong Kong) Limited':'花旗銀行',
    'China CITIC Bank International Limited':'中信銀行',
    'China Construction Bank (Asia) Corporation Limited':'中國建設銀行',
    'Fubon Bank (Hong Kong) Limited':'富邦銀行',
    'Chiyu Banking Corporation Limited':'集友銀行',
    'Australia and New Zealand Banking Group Limited, Hong Kong Branch':'澳新銀行',
    'China Merchants Bank Hong Kong Branch':'招商銀行'
};

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
							}

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

// Delete duplicated branch
var deleteDuplicated = function(branches) {
	return new Promise(function(resolve) {
		var duplicated = JSON.parse(fs.readFileSync(patchDir + 'duplicated.json', 'utf8'));

		for (var i = 0; i < branches.length - 1; i++) {
			if (duplicated.indexOf(branches[i]._id) > -1) {
				// If branch._id exist in duplicated patch
				// Delete it
				branches.splice(i, 1);
				i--;
			} else {
				for (var j = i + 1; j < branches.length; j++) {
					if (branches[i].address.zh.trim() === branches[j].address.zh.trim()) {
						// If branches zh address is duplicated
						// Delete one of it
						branches.splice(j, 1);
						j--;
					} else if (branches[i].address.en.trim() === branches[j].address.en.trim()) {
						// If branches en address is duplicated
						// Delete one of it
						branches.splice(j, 1);
						j--;
					}
				}
			}
		}

		resolve(branches);
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
	.then(deleteDuplicated)
	// Save to json
	.then(function(branches) {
		return new Promise(function(resolve) {
			//console.log(JJetco: SON.stringify(branches, 0, 4));

			var banks = [];
			for (var i = 0; i < branches.length; i++) {
				var index = banks.map(function(e) {
					return e.zh;
				}).indexOf(branches[i].name.zh);
				if (index === -1) {
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