'use strict';

/**
 * Download all mannings branch infos, parse it and save to branches.json
 */
var Promise = require('bluebird');
var request = require('request');
var fs = require('fs');

var dataDir = __dirname + '/data/';
var url = 'https://www.mannings.com.hk/js/location.js';

var area = {
	1: {
		zh: '香港島',
		en: 'Hong Kong Island'
	},
	2: {
		zh: '九龍',
		en: 'Kowloon'
	},
	3: {
		zh: '新界',
		en: 'New Territories'
	},
	4: {
		zh: '澳門',
		en: 'Macau'
	}
};

var district = {
	1: {
		zh: '中西區',
		en: 'Central and Western'
	},
	2: {
		zh: '灣仔',
		en: 'Wan Chai'
	},
	3: {
		zh: '東區',
		en: 'Eastern'
	},
	4: {
		zh: '南區',
		en: 'Southern'
	},
	5: {
		zh: '油尖旺',
		en: 'Yau Tsim Mong'
	},
	6: {
		zh: '深水埗',
		en: 'Sham Shui Po'
	},
	7: {
		zh: '九龍城',
		en: 'Kowloon City'
	},
	8: {
		zh: '黃大仙',
		en: 'Wong Tai Sin'
	},
	9: {
		zh: '觀塘',
		en: 'Kwun Tong'
	},
	10: {
		zh: '葵青',
		en: 'Kwai Tsing'
	},
	11: {
		zh: '荃灣',
		en: 'Tsuen Wan'
	},
	12: {
		zh: '屯門',
		en: 'Tuen Mun'
	},
	13: {
		zh: '元朗',
		en: 'Yuen Long'
	},
	14: {
		zh: '北區',
		en: 'North'
	},
	15: {
		zh: '大埔',
		en: 'Tai Po'
	},
	16: {
		zh: '沙田',
		en: 'Sha Tin'
	},
	17: {
		zh: '西貢',
		en: 'Sai Kung'
	},
	18: {
		zh: '離島',
		en: 'Islands'
	},
	19: {
		zh: '澳門',
		en: 'Macau'
	}
};

// Branch Object
function Branch(branch) {
	this._id = 'MANNINGS_' + branch.location_EN.replace(/ /g, '_').trim();
	this.atm_type = 'eps';
	this.name = {
		zh: '萬寧 ' + branch.location_TC,
		en: 'Mannings ' + branch.location_EN
	};
	this.shop_type = 'mannings';
	this.area = area[branch.area1];
	this.district = district[branch.area2];
	this.address = {
		zh: branch.address_TC,
		en: branch.address_EN
	};
	this.service = null;

	var detailZh = branch.time1_TC + ' ' + branch.timetime1_TC + '\n' + branch.time2_TC + ' ' + branch.timetime2_TC + '\n' + branch.time3_TC + ' ' + branch.timetime3_TC;
	var detailEn = branch.time1_EN + ' ' + branch.timetime1_EN + '\n' + branch.time2_EN + ' ' + branch.timetime2_EN + '\n' + branch.time3_EN + ' ' + branch.timetime3_EN;

	this.detail = {
		zh: detailZh.trim(),
		en: detailEn.trim()
	};
	this.atm24 = false;
	this.loc = branch.lenlng;
	this.workHrs = getWorkingHrs(branch);

	this.tel = null;
}

var getWorkingHrs = function(branch) {
	var workHrs = ['-', '-', '-', '-', '-', '-', '-'];

	for (var i = 1; i <= 3; i++) {
		var dayAttr = 'time' + i + '_EN';
		var timeAttr = 'time' + dayAttr;
		var timeStr = formatTimeStr(branch[timeAttr]);
		switch (branch[dayAttr]) {
			case 'Monday-Sunday':
				for (var i = 0; i < 7; i++) {
					workHrs[i] = timeStr;
				}
				break;
			case 'Monday-Saturday':
				for (var i = 0; i < 6; i++) {
					workHrs[i] = timeStr;
				}
				break;
			case 'Sunday':
			case 'Sunday & Public Holiday':
				workHrs[6] = timeStr;
				break;
			case 'Monday-Thursday':
				for (var i = 0; i < 4; i++) {
					workHrs[i] = timeStr;
				}
				break;
			case 'Friday-Sunday':
				for (var i = 4; i < 7; i++) {
					workHrs[i] = timeStr;
				}
				break;
			case 'Monday-Friday':
				for (var i = 0; i < 5; i++) {
					workHrs[i] = timeStr;
				}
				break;
			case 'Saturday-Sunday':
			case 'Saturday-Sunday & Public Holiday':
				for (var i = 5; i < 7; i++) {
					workHrs[i] = timeStr;
				}
				break;
			case 'Friday-Sunday & Public Holiday':
				for (var i = 4; i < 7; i++) {
					workHrs[i] = timeStr;
				}
				break;
			case 'Sunday-Thursday':
			case 'Sunday-Thursday & Public Holiday':
				for (var i = 0; i < 7; i++) {
					if (i === 4 || i === 5) {
						continue;
					} else {
						workHrs[i] = timeStr;
					}
				}
				break;
			case 'Friday-Saturday':
			case 'Friday-Saturday & Public Holiday':
				for (var i = 4; i < 6; i++) {
					workHrs[i] = timeStr;
				}
				break;
			case 'Monday-Friday & Sunday':
				for (var i = 0; i < 4; i++) {
					workHrs[i] = timeStr;
				}
				workHrs[6] = timeStr;
				break;
			case 'Saturday':
				workHrs[5] = timeStr;
				break;
			case 'Monday & Wednesday-Sunday':
				workHrs[0] = timeStr;
				for (var i = 2; i < 7; i++) {
					workHrs[i] = timeStr;
				}
				break;
			case 'Tuesday':
				workHrs[1] = timeStr;
				break;
			case 'Monday':
				workHrs[0] = timeStr;
				break;
			case 'Tuesday-Sunday':
				for (var i = 1; i < 7; i++) {
					workHrs[i] = timeStr;
				}
				break;
			case 'Sunday-Friday':
				for (var i = 0; i < 7; i++) {
					if (i !== 5) {
						workHrs[i] = timeStr;
					}
				}
				break;
			default:
				break;
		}
	}

	return {
		'monday': workHrs[0],
		'tuesday': workHrs[1],
		'wednesday': workHrs[2],
		'thursday': workHrs[3],
		'friday': workHrs[4],
		'saturday': workHrs[5],
		'sunday': workHrs[6]
	};
};

var formatTimeStr = function(timeStr) {
	if (timeStr === 'Closed') {
		return '-';
	}

	var output = timeStr.match(/[0-9]{1,2}:[0-9]{1,2}-[0-9]{1,2}:[0-9]{1,2}/gi);

	if (output === null) {
		return '-';
	} else {
		output = output[0];
		if (output[1] === ':') {
			output = '0' + output;
		}
		if (output[7] === ':') {
			output = output.replace('-', '-0');
		}
		output = output.replace('-', ' - ');

		return output;
	}
};

// Get all Mannings branches
var getBranches = function() {
	return new Promise(function(resolve, reject) {
		request
			.get(url, function(error, response, body) {

				// Save the response body

				var toArrayFunctionString = 'var toArray = function(lat,lng) {return [lng, lat];}\n';
				body = body.replace(/new google.maps.LatLng/g, 'toArray');
				body = body.substring(0, body.indexOf('var cate1 = []'));
				body = toArrayFunctionString + body + '\nmodule.exports=original_location_arr;';

				saveResponseBody('location.js', url, body);

				var location = require(dataDir + 'location.js');

				// Resolve it
				resolve(location);
			})
			.on('error', function(error) {

				// Error
				reject(error);
			});
	});
};

// Save response body
var saveResponseBody = function(filename, url, body) {
	if (!fs.existsSync(dataDir)) {
		fs.mkdirSync(dataDir);
	}
	fs.writeFileSync(dataDir + filename, body, 'utf-8');

	console.log('Mannings: Save ' + filename + ' success!');
};

// Format branches array
var formatBranches = function(branches) {
	return new Promise(function(resolve) {

		var timeType = [];
		var timeStringType = [];

		for (var i = 0; i < branches.length; i++) {
			if (timeType.indexOf(branches[i].time1_EN) === -1) {
				timeType.push(branches[i].time1_EN);
			}
			if (timeType.indexOf(branches[i].time2_EN) === -1) {
				timeType.push(branches[i].time2_EN);
			}
			if (timeType.indexOf(branches[i].time3_EN) === -1) {
				timeType.push(branches[i].time3_EN);
			}

			if (timeStringType.indexOf(branches[i].timetime1_EN) === -1) {
				timeStringType.push(branches[i].timetime1_EN);
			}
			if (timeStringType.indexOf(branches[i].timetime2_EN) === -1) {
				timeStringType.push(branches[i].timetime2_EN);
			}
			if (timeStringType.indexOf(branches[i].timetime3_EN) === -1) {
				timeStringType.push(branches[i].timetime3_EN);
			}
		}

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
			console.log('Mannings: Save branches.json success!');
			console.log('Mannings: Finish.');

			resolve(branches);
		});
	})
	// Error handler
	.catch(function(error) {
		console.log('Mannings: ' + error);
	});

module.exports = branches;