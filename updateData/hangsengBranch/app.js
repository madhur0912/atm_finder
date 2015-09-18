'use strict';

/**
 * Download all Hang Seng branch infos, parse it and save to branches.json
 */
var Promise = require('bluebird');
var fs = require('fs');
var $ = require('cheerio');
var request = require('request');
var key = require('./../key');

// Geocoder
var geocoderProvider = 'google';
var httpAdapter = 'https';
var extra = {
	apiKey: key.geocoderKey, // for Mapquest, OpenCage, Google Premier
	language: 'zh-hk',
	formatter: null // 'gpx', 'string', ...
};
var geocoder = require('node-geocoder')(geocoderProvider, httpAdapter, extra);

// Path
var dataDir = __dirname + '/data/';
var patchDir = __dirname + '/patch/';
var geocodeJsonPath = dataDir + 'geocode.json';
var zhUrl = 'http://bank.hangseng.com/1/2/chi/contact-us/branch-addresses';
var enUrl = 'http://bank.hangseng.com/1/2/contact-us/branch-addresses';

// Services Key-String pair
var servicesZh = {
	'Disable': '輪椅通道',
	'ABC': '自助理財中心',
	'ATM': '自動櫃員機',
	'CHQ': '存票快入票機 截票時間',
	'SDB': '保管箱服務',
	'CDM': '存款快入數機',
	'SEC': '證券服務',
};

var servicesEn = {
	'Disable': 'Wheel Chair Access',
	'ABC': 'Automated Banking Centres',
	'ATM': 'Automated Teller Machine',
	'CHQ': 'Cheque Deposit Machine, Cut-off time ',
	'SDB': 'Safe Deposit Box Services',
	'CDM': 'Cash Deposit Machine',
	'SEC': 'Securities Services',
};

// Return the workingHour Object
// Return null if the workingHour is invalid
function workingHourFromBranch(branch) {
	if (branch.HourWeekdays.length > 0) {
		return {
			'monday': branch.HourWeekdays,
			'tuesday': branch.HourWeekdays,
			'wednesday': branch.HourWeekdays,
			'thursday': branch.HourWeekdays,
			'friday': branch.HourWeekdays,
			'saturday': branch.HourSat,
			'sunday': '-'
		};
	}

	return null;
}

var branchGetLatLong = function(branch) {
	return new Promise(function(resolve, reject) {
		// Get the address and patch
		var address = branch.address.zh;
		var name = branch.name.zh;
		var patch = JSON.parse(fs.readFileSync(patchDir + 'patch.json', 'utf8'));

		if (patch.address.hasOwnProperty(address)) {
			// If address exist in patch
			// Set .lat and .lng
			// and resolve it
			branch.loc = patch.address[address];

			resolve(branch);
		} else if (patch.name.hasOwnProperty(name)) {
			// If name exist in patch
			// Set .lat and .lng
			// and resolve it
			branch.loc = patch.name[name];

			resolve(branch);
		} else {

			// Not exist in patch
			// Use geocoder to find lat and long
			geocoder.geocode(address.replace('港鐵', ''))
				.then(function(res) {
					console.log('HangSeng: geocode result = [' + address + ', ' + res[0].latitude + ', ' + res[0].longitude + ']');

					// Save each geocode result
					if (!fs.existsSync(geocodeJsonPath)) {
						var geocodeJson = '//' + address + '\n' + JSON.stringify(res[0], 0, 4);
						fs.writeFileSync(geocodeJsonPath, geocodeJson, 'utf-8');
					} else {
						var geocodeJson = fs.readFileSync(geocodeJsonPath, 'utf8');
						geocodeJson += ',\n\n//' + address + '\n' + JSON.stringify(res[0], 0, 4);
						fs.writeFileSync(geocodeJsonPath, geocodeJson, 'utf-8');
					}

					// Get the response
					// Set .lat and .lng and resolve it
					branch.loc = [res[0].longitude, res[0].latitude];
					//sleep.usleep(1000000 / 4);
					//resolve(branch);
					setTimeout(function() {
						resolve(branch);
					}, 1000 / 4);
				})
				.catch(function(err) {

					// Error
					reject(err);
				});
		}
	});
};

var formatBranch = function(branch) {
	return new Promise(function(resolve) {

		// Set basic serviceString
		var serviceStringZh = branch.zh.HourRemark.replace(/\/ /g, '\n');
		var serviceStringEn = branch.en.HourRemark.replace(/\/ /g, '\n');

		// For every services
		var serviceKeys = Object.keys(servicesZh);
		for (var i = 0; i < serviceKeys.length; i++) {
			// If that branch has that service
			if (branch.zh[serviceKeys[i]]) {
				if (serviceKeys[i] === 'ATM' && branch.zh.ATMRMB) {

					// If the key is 'ATM' and 'ATMRMB' is also true
					// Add ATM and ATMRMB string to serviceString
					serviceStringZh += servicesZh[serviceKeys[i]] + '(港幣及人民幣)' + '\n';
					serviceStringEn += servicesEn[serviceKeys[i]] + '(HKD & RMB)' + '\n';
				} else if (serviceKeys[i] === 'CHQ') {

					// If the key is 'CHQ'
					// Add CHQ and CHQCUT string to serviceString
					serviceStringZh += servicesZh[serviceKeys[i]] + ' ' + branch.zh.CHQCUT + '\n';
					serviceStringEn += servicesEn[serviceKeys[i]] + ' ' + branch.en.CHQCUT + '\n';
				} else {

					// Else, add the service string
					serviceStringZh += servicesZh[serviceKeys[i]] + '\n';
					serviceStringEn += servicesEn[serviceKeys[i]] + '\n';
				}
			}
		}

		// Set detailString to be ATM working hour
		var detailStringZh = branch.zh.HourAMB.replace(/<br\/>/g, '\n');
		var detailStringEn = branch.en.HourAMB.replace(/<br\/>/g, '\n');

		// Set atm24
		var atm24 = (JSON.stringify(branch.zh).indexOf('24小') != -1);

		// Set workHrs
		var workHrs = workingHourFromBranch(branch.zh);

		var result = {
			_id: 'HANGSENG_' + branch.zh.Code,
			atm_type: 'hsbcgroup',
			shop_type: 'hangseng',
			name: {
				zh: branch.zh.Name,
				en: branch.en.Name
			},
			area: {
				zh: branch.zh.area,
				en: branch.en.area
			},
			district: {
				zh: branch.zh.district,
				en: branch.en.district
			},
			address: {
				zh: branch.zh.Address,
				en: branch.en.Address
			},
			service: {
				zh: serviceStringZh.trim(),
				en: serviceStringEn.trim()
			},
			detail: {
				zh: detailStringZh,
				en: detailStringEn
			},
			atm24: atm24,
			workHrs: workHrs,
			tel: null
		};

		resolve(result);
	});
};

// Save response body
var saveResponseBody = function(filename, body) {
	if (!fs.existsSync(dataDir)) {
		fs.mkdirSync(dataDir);
	}
	fs.writeFileSync(dataDir + filename, body, 'utf-8');

	console.log('HangSeng: Save ' + filename + ' success!');
};

// Input the branch and districts Object,
// Return the branch with property .area and .district
var addAreaAndDistrictToBranch = function(branch, districts) {

	// In districts Object, find the code that match with branch.SubDistrict
	// Then set .area and .district
	for (var i = 0; i < districts.length; i++) {
		for (var j = 0; j < districts[i].SubDistricts.length; j++) {
			if (districts[i].SubDistricts[j].Code === branch.SubDistrict) {
				branch.area = districts[i].Name;
				branch.district = districts[i].SubDistricts[j].Name;
			}
		}
	}

	return branch;
};

// Get all branches
// Return the Promise of object with branches and districts
var getAllBranchesZh = function() {
	return new Promise(function(resolve, reject) {

		// Get the html file which contains the branch data
		request
			.get(zhUrl, function(error, response, body) {

				// Save the response body
				saveResponseBody('/bodyZh.html', body);

				// Cut out the useful script
				var text = $(body).find('script').text();
				var start = text.indexOf('allSites ');
				var end = text.indexOf('var html');
				text = text.substring(start, end);

				// Add some code to exports the branch array and district array
				text = text + '\nexports.allSites = allSites;\nexports.districts = districts;';
				text = text.replace(/<br\/>/, '/ ');

				// Save it to branches.js
				fs.writeFileSync(dataDir + 'branchesZh.js', text, 'utf-8');

				// Read it
				var readBranches = require(dataDir + 'branchesZh.js');
				var branches = readBranches.allSites;
				var districts = readBranches.districts;

				// Filter branch without ATM
				var branches = branches.filter(function(branch) {
					return branch.ATM;
				});

				// Add .area and .district to branches
				for (var i = 0; i < branches.length; i++) {
					branches[i] = addAreaAndDistrictToBranch(branches[i], districts);
				}

				// Resolve it
				resolve(branches);
			})
			.on('error', function(error) {

				// Error
				reject(error);
			});
	});
};


// Get all branches
// Return the Promise of object with branches and districts
var getAllBranchesEn = function() {
	return new Promise(function(resolve, reject) {

		// Get the html file which contains the branch data
		request
			.get(enUrl, function(error, response, body) {

				// Save the response body
				saveResponseBody('/bodyEn.html', body);

				// Cut out the useful script
				var text = $(body).find('script').text();
				var start = text.indexOf('allSites ');
				var end = text.indexOf('var html');
				text = text.substring(start, end);

				// Add some code to exports the branch array and district array
				text = text + '\nexports.allSites = allSites;\nexports.districts = districts;';
				text = text.replace(/<br\/>/, '/ ');

				// Save it to branches.js
				fs.writeFileSync(dataDir + 'branchesEn.js', text, 'utf-8');

				// Read it
				var readBranches = require(dataDir + 'branchesEn.js');
				var branches = readBranches.allSites;
				var districts = readBranches.districts;

				// Filter branch without ATM
				var branches = branches.filter(function(branch) {
					return branch.ATM;
				});

				// Add .area and .district to branches
				for (var i = 0; i < branches.length; i++) {
					branches[i] = addAreaAndDistrictToBranch(branches[i], districts);
				}

				// Resolve it
				resolve(branches);
			})
			.on('error', function(error) {

				// Error
				reject(error);
			});
	});
};

// Merge two array
var mergeZhEnBranches = function(zh, en) {
	return new Promise(function(resolve, reject) {
		var branches = [];

		for (var i = 0; i < zh.length; i++) {
			var branch = {
				zh: zh[i],
				en: en[i]
			};

			if (branch.zh.Code === branch.en.Code) {
				branches.push(branch);
			} else {
				reject('Error: Branch Zh and En array are not match!');
			}
		}

		resolve(branches);
	});
};

// Delete previous geocode.json
fs.unlink(geocodeJsonPath, function(err) {
	if (err) {
		console.log('HangSeng: ' + err);
	} else {
		console.log('HangSeng: Successfully deleted ' + geocodeJsonPath);
	}
});

// Start the Promise
var branches = Promise
	.join(getAllBranchesZh(), getAllBranchesEn(), mergeZhEnBranches)
	.map(formatBranch)
	.map(branchGetLatLong, {
		concurrency: 1
	})
	.then(function(branches) {
		return new Promise(function(resolve) {
			// Sort branches by longitude
			branches.sort(function(a, b) {
				return a.loc[0] - b.loc[0];
			});

			fs.writeFileSync(__dirname + '/branches.json', JSON.stringify(branches, 0, 4), 'utf-8');
			console.log('HangSeng: Save branches.json success!');
			console.log('HangSeng Finish.');
			resolve(branches);
		});
	})
	.catch(function(error) {
		console.log('HangSeng: ' + error);
	});

// Exports the promise with branches
module.exports = branches;