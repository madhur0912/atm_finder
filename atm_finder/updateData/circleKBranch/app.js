'use strict';
/**
 * Download all CircleK branch infos, parse it and save to branches.json
 */
var Promise = require('bluebird');
var request = require('request');
var fs = require('fs');
var $ = require('cheerio');

var dataDir = __dirname + '/data/';
var urlZh = 'http://www.circlek.hk/store';
var urlEn = 'http://www.circlek.hk/en/store';

// Constructor of Branch
// Input a CircleK branch json, return a Branch Object
function Branch(branch) {

	// Set basic key-value
	this._id = 'CIRCLEK_' + branch.store_no;
	this.atm_type = 'eps';
	this.shop_type = 'circleK';
	this.name = {
		zh: 'OK便利店',
		en: 'CircleK'
	};
	this.area = {
		zh: branch.zh.zone,
		en: branch.zone
	};
	this.district = {
		zh: branch.zh.location,
		en: branch.location
	};
	this.address = {
		zh: branch.zh.address,
		en: branch.address
	};
	this.loc = [parseFloat(branch.longitude), parseFloat(branch.latitude)];
	this.service = null;
	this.tel = null;

	var zhDetail = branch.zh.operation_day.trim() === '' ? null : branch.zh.operation_day.trim();
	var enDetail = branch.operation_day.trim() === '' ? null : branch.operation_day.trim();

	this.detail = {
		zh: zhDetail,
		en: enDetail
	};

	// Parse working hours
	if (branch.operation_hour.indexOf('24 ') > -1) {
		// It is 24 hours
		this.atm24 = true;
		this.workHrs = null;
	} else {
		// Not 24 hours
		this.atm24 = false;

		var wkd = '';
		var sat = '';
		var sun = '';

		var workHrs = branch.operation_hour;

		if (workHrs.indexOf('am') > -1) {
			// Special case
			// workHrs contain 'am' 'pm'
			workHrs = workHrs.replace(/am|pm/g, '');
			workHrs = formatWorkingHourString(workHrs);

			wkd = workHrs;
			sat = workHrs;
			sun = workHrs;

		} else if (workHrs.match(/[A-Z]/gi) === null) {
			// Is a pure time
			// No english inside
			// Set all workHrs
			workHrs = formatWorkingHourString(workHrs);

			wkd = workHrs;
			sat = workHrs;
			sun = workHrs;

		} else {
			// Have english inside
			var match = workHrs.match(/.{0,2}:.. {0,1}[-–] {0,1}..:../gi);

			if (match.length === 1) {
				// Only one time, apply to all
				// Close on Check will filter
				var firstIndex = workHrs.indexOf(match[0]);
				wkd = formatWorkingHourString(match[0]);
				sat = wkd;
				sun = wkd;
			} else {

				// Two time
				// Set wkd and sun first
				// Check first time range
				var firstIndex = workHrs.indexOf(match[0]);
				var firstForSat = (workHrs.substring(0, firstIndex).indexOf('Sat') > -1);
				wkd = formatWorkingHourString(match[0]);
				sun = formatWorkingHourString(match[1]);

				// If first is for Sat
				// set sat
				if (firstForSat) {
					sat = wkd;
				} else {
					// else Second is for sat
					sat = sun;
				}
			}
		}

		// Close on Check
		if (branch.operation_hour.indexOf('Close') > -1 || branch.operation_day.indexOf('Close') > -1) {
			sun = '-';
		}

		// Set workHrs
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
}

// Format working hour string
var formatWorkingHourString = function(workHrs) {
	workHrs = workHrs.replace(/ /g, '');
	workHrs = workHrs.replace(/–/g, '-');
	workHrs = workHrs.replace(/-/g, ' - ');
	if (workHrs[0] !== '0') {
		workHrs = '0' + workHrs;
	}

	return workHrs;
};

// Save response body
var saveResponseBody = function(filename, body) {
	if (!fs.existsSync(dataDir)) {
		fs.mkdirSync(dataDir);
	}
	fs.writeFileSync(dataDir + filename, body, 'utf-8');

	console.log('CircleK: Save ' + filename + ' success!');
};

// Get all circleK branches
// language can be 'zh' or 'en' only
var getBranches = function(language) {
	return new Promise(function(resolve, reject) {

		var url = (language === 'zh') ? urlZh : urlEn;

		request
			.get(url, function(error, response, body) {

				// Save response body
				saveResponseBody('body.' + language + '.html', body);

				// Cut out the useful script
				var text = $(body).find('script').text();
				var start = text.indexOf('var store_list = [];');
				var end = text.indexOf('onChangeRegion();');
				text = text.substring(start, end);

				// Replace some text
				text = text.replace('$(document).ready(function() {', '');
				text = text.replace(/jQuery/g, 'JSON');
				text = text.replace(/parseJSON/g, 'parse');

				// Unicode to char
				var r = /\\u([\d\w]{4})/gi;
				text = text.replace(r, function(match, grp) {
					return String.fromCharCode(parseInt(grp, 16));
				});
				/*global unescape: true */
				text = unescape(text);

				// Add some code to exports the branch array and district array
				text = text + '\nexports.store_list = store_list;\nexports.region_list = region_list;';
				text = text.replace(/<br\/>/, '/ ');

				// Save it to branches.js
				fs.writeFileSync(dataDir + 'branches' + language + '.js', text, 'utf-8');

				// Read it
				var readBranches = require(dataDir + 'branches' + language + '.js');
				var store_list = readBranches.store_list;

				var branches = Object.keys(store_list).map(function(k) {
					return store_list[k];
				});

				branches = [].concat.apply([], branches);

				// Resolve it
				resolve(branches);
			})
			.on('error', function(error) {

				// Error
				reject(error);
			});
	});
};

// Merge two language of branch to one array
var mergeBranches = function(zh, en) {
	return new Promise(function(resolve, reject) {
		// Return an array with en branch embedded with zh branch
		for (var i = 0; i < en.length; i++) {
			for (var j = 0; j < zh.length; j++) {

				// store_no is equal
				// embedded it and remove from zh
				if (en[i].store_no === zh[j].store_no) {
					en[i].zh = zh[j];
					zh.splice(j, 1);
					break;
				}
			}
		}

		// If there are item left in zh
		// Error occur
		if (zh.length > 0) {
			reject('Error: Zh and En do not match!');
		} else {
			resolve(en);
		}
	});
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

// Remove branches from Macau
var removeMacau = function(branches) {
	return new Promise(function(resolve) {
		for (var i = 0; i < branches.length; i++) {
			if (branches[i].district.en === 'Macau') {
				branches.splice(i, 1);
				i--;
			}
		}

		resolve(branches);
	});
};

// Start the promise
var branches = Promise
	.join(getBranches('zh'), getBranches('en'), mergeBranches)
	.then(formatBranches)
	.then(removeMacau)
	.then(function(branches) {
		return new Promise(function(resolve) {

			// Sort branches by longitude
			branches.sort(function(a, b) {
				return a.loc[0] - b.loc[0];
			});

			// Save to branches.json
			fs.writeFileSync('branches.json', JSON.stringify(branches, 0, 4), 'utf-8');
			console.log('CircleK: Save branches.json success!');
			console.log('CircleK: Finish.');

			resolve(branches);
		});
	})
	// Error handler
	.catch(function(error) {
		console.log('CircleK: ' + error);
	});

module.exports = branches;