'use strict';

/**
 * Download all watsons branch infos, parse it and save to branches.json
 */
var Promise = require('bluebird');
var request = require('request');
var fs = require('fs');
var $ = require('cheerio');

var dataDir = __dirname + '/data/';

var langUrl = 'http://www.watsons.com.hk/_s/language';
var url = 'http://www.watsons.com.hk/storeLocator/';

// Branch Object
function Branch(en, zt) {
	this._id = 'WATSONS_' + en.name.replace(/ /g, '_');
	this.atm_type = 'eps';
	this.name = {
		zh: '屈臣氏 ' + zt.name,
		en: 'Watsons ' + en.name
	};
	this.shop_type = 'watsons';
	this.area = {
		zh: zt.area,
		en: en.area
	};
	this.district = {
		zh: zt.district,
		en: en.district
	};
	this.address = {
		zh: zt.address,
		en: en.address
	};
	this.service = null;
	this.detail = null;
	this.atm24 = false;
	this.loc = en.loc;
	this.workHrs = en.workHrs;
	this.tel = null;
}

// Get all Watsons branches
// Return the array of branches HTML source
var getBranches = function(code) {
	return new Promise(function(resolve, reject) {

		// Post a request for language
		request
			.post({
				url: langUrl,
				followAllRedirects: true,
				form: {
					code: code,
					CSRFToken: 'cf77f969-a6ce-4769-9093-fca4af677af7'
				},
				headers: {
					Host: 'www.watsons.com.hk',
					Connection: 'keep-alive',
					'Content-Length': 54,
					'Cache-Control': 'max-age=0',
					Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
					Origin: 'http://www.watsons.com.hk',
					'Upgrade-Insecure-Requests': 1,
					'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.155 Safari/537.36',
					'Content-Type': 'application/x-www-form-urlencoded',
					Referer: 'http://www.watsons.com.hk/storeLocator',
					'Accept-Encoding': 'gzip, deflate',
					'Accept-Language': 'zh-TW,zh;q=0.8,en-US;q=0.6,en;q=0.4,zh-CN;q=0.2',
					Cookie: 'JSESSIONID=C36499A8BAA9C7FF3F028F5505735060.whkpfa05; deliveryRegion=hk; JSESSIONID=C36499A8BAA9C7FF3F028F5505735060.whkpfa05; Hm_lvt_1ca6603f12694b02f66a742bf721814a=1440005585,1440037861,1440084056,1440084071; Hm_lpvt_1ca6603f12694b02f66a742bf721814a=1440088787; _ga=GA1.3.1601988408.1440067302'
				}
			}, function(err, response) {

				// Get the response cookie
				var cookie = '';
				if (typeof response.headers['set-cookie'] != 'undefined') {
					response.headers['set-cookie'].forEach(function(aCookie) {
						cookie = aCookie;
					});
				}

				// Get the storeLocator page with cookie
				request
					.get({
						url: url,
						headers: {
							'Cookie': cookie
						}
					}, function(error, response, body) {

						// Save the response body
						saveResponseBody('storeLocator.' + code + '.html', url, body);

						// Divide each html branch
						var branches = $(body).find('div').filter(function() {
							return $(this).attr('style') === 'display: none;font-size: 12px';
						});

						resolve(formatBranches(branches));
					})
					.on('error', function(error) {

						// Error
						reject(error);
					});
			});
	});
};

// Parse each html to object
var htmlToObject = function(html) {
	// Get name
	var name = $(html).find('p').filter(function() {
		return $(this).attr('class') === 'title';
	});

	// Get address
	var addr = name.next().text().trim();

	var store = $(html).find('div').filter(function() {
		return $(this).attr('style') === 'width: 48%;';
	});

	// Get workHrs
	var workHrsArray = $(store.html()).text().replace('Store', '').trim().match(/\d.{1,10}[-–].{1,10}\(.{1,40}\)/g);
	if (workHrsArray === null) {
		workHrsArray = [$(store.html()).text().replace('Store', '').trim() + '(Daily)'];
	}
	for (var j = 0; j < workHrsArray.length; j++) {
		workHrsArray[j] = workHrsArray[j].replace('–', '-').replace(/ /g, '').replace(',', '&').replace('&PublicHoliday', '');
	}

	// Get script
	// Which contain {lat,lng} , Region and District inside
	var script = $(html).next().next().text().trim();

	// Get lat lng
	var loc = script.match(/\{lat: .*, lng: .*\}/g);
	loc = JSON.parse(loc[0].replace('lat', '"lat"').replace('lng', '"lng"'));

	// Get region and district string
	var regionAndDistrictString = script.substring(script.indexOf('arrayStoresRegion'), script.length);
	var regionAndDistrict = regionAndDistrictString.match(/\".*\"/g);
	var region = regionAndDistrict[0].replace(/\"/g, '');
	var district = regionAndDistrict[1].replace(/\"/g, '');

	var branch = {
		atm_type: 'eps',
		shop_type: 'watsons',
		name: name.text().trim(),
		address: addr,
		workHrs: workHrsArrayToObject(workHrsArray),
		loc: [loc.lng, loc.lat],
		atm24: false,
		service: null,
		detail: null,
		area: region,
		district: district,
		tel: null,
	};

	return branch;
};

// Parse time string to our db format
var parseTimeString = function(timeString) {

	if ((timeString.indexOf('am') > -1) || (timeString.indexOf('noon') > -1)) {
		// It is am or noon
		timeString = timeString.replace('am', '').replace('noon', '');

		// Add minutes if needed
		if (timeString.indexOf(':') === -1) {
			timeString += ':00';
		}

		// Add leading 0 if needed
		if (timeString.length < 5) {
			timeString = '0' + timeString;
		}

	} else {
		// It is pm
		timeString = timeString.replace('pm', '');

		// Add minutes if needed
		if (timeString.indexOf(':') === -1) {
			timeString += ':00';
		}

		// Add leading 0 if needed
		if (timeString.length < 5) {
			timeString = '0' + timeString;
		}

		// Get hours and add 12
		var hr = timeString.substring(0, timeString.indexOf(':'));
		if (hr < 12) {
			hr = Number(hr) + 12;
		}
		timeString = hr + timeString.substring(2, 5);
	}

	return timeString;
};

// Input workHrs Array
// Return workHrs Object
var workHrsArrayToObject = function(workHrsArray) {
	var workHrs = ['-', '-', '-', '-', '-', '-', '-'];

	for (var i = 0; i < workHrsArray.length; i++) {

		var workHrsString = workHrsArray[i];
		var start = workHrsString.substring(0, workHrsString.indexOf('-'));
		var end = workHrsString.substring(workHrsString.indexOf('-') + 1, workHrsString.indexOf('('));
		var day = workHrsString.substring(workHrsString.indexOf('('), workHrsString.length);

		var timeStr = parseTimeString(start) + ' - ' + parseTimeString(end);

		workHrs = modifyWorkHrs(workHrs, day, timeStr);
	}

	var result = {
		'monday': workHrs[0],
		'tuesday': workHrs[1],
		'wednesday': workHrs[2],
		'thursday': workHrs[3],
		'friday': workHrs[4],
		'saturday': workHrs[5],
		'sunday': workHrs[6]
	};

	return result;
};

// Modify workHrs array with day and timeStr
var modifyWorkHrs = function(workHrs, day, timeStr) {
	switch (day) {
		case '(Daily)':
			for (var i = 0; i < 7; i++) {
				workHrs[i] = timeStr;
			}
			break;
		case '(Mon-Sat)':
			for (var i = 0; i < 6; i++) {
				workHrs[i] = timeStr;
			}
			break;
		case '(Sun)':
			workHrs[6] = timeStr;
			break;
		case '(Mon-Thu)':
			for (var i = 0; i < 4; i++) {
				workHrs[i] = timeStr;
			}
			break;
		case '(Fri-Sun)':
			for (var i = 4; i < 7; i++) {
				workHrs[i] = timeStr;
			}
			break;
		case '(Mon-Fri)':
			for (var i = 0; i < 5; i++) {
				workHrs[i] = timeStr;
			}
			break;
		case '(Sat-Sun)':
		case '(Sat&Sun)':
			for (var i = 5; i < 7; i++) {
				workHrs[i] = timeStr;
			}
			break;
		case '(Sun-Thu)':
		case '(Sun–Thu)':
			for (var i = 0; i < 7; i++) {
				if (i === 4 || i === 5) {
					continue;
				} else {
					workHrs[i] = timeStr;
				}
			}
			break;
		case '(Fri&Sat)':
		case '(Fri-Sat)':
			for (var i = 4; i < 6; i++) {
				workHrs[i] = timeStr;
			}
			break;
		case '(Sat)':
			workHrs[5] = timeStr;
			break;
		case '(Mon&Wed-Sun)':
			workHrs[0] = timeStr;
			for (var i = 2; i < 7; i++) {
				workHrs[i] = timeStr;
			}
			break;
		case '(Fri)':
			workHrs[4] = timeStr;
			break;
		case '(Sun-Fri)':
			for (var i = 0; i < 7; i++) {
				if (i !== 5) {
					workHrs[i] = timeStr;
				}
			}
			break;
		case '(Mon-Thu&Sun)':
			for (var i = 0; i < 7; i++) {
				if ((i !== 5) || (i !== 4)) {
					workHrs[i] = timeStr;
				}
			}
			break;
		default:
			break;
	}

	return workHrs;
};

// Save response body
var saveResponseBody = function(filename, url, body) {
	if (!fs.existsSync(dataDir)) {
		fs.mkdirSync(dataDir);
	}
	fs.writeFileSync(dataDir + filename, body, 'utf-8');

	console.log('Watsons: Save ' + filename + ' success!');
};

// Format branches array
var formatBranches = function(branches) {
	return new Promise(function(resolve) {

		var formated = [];

		for (var i = 0; i < branches.length; i++) {
			formated.push(htmlToObject(branches[i]));
		}

		resolve(formated);
	});
};

// Merge En and Zt Branches
var mergeEnZtBranches = function(enAndZt) {
	return new Promise(function(resolve) {

		var en = enAndZt[0];
		var zt = enAndZt[1];

		var branches = [];

		for (var i = 0; i < en.length; i++) {

			for (var j = 0; j < zt.length; j++) {
				if (JSON.stringify(en[i].loc) === JSON.stringify(zt[j].loc)) {
					// If found match en and zt
					// Construct a branch
					if (JSON.stringify(en[i].loc) === '[113.941234,22.289067]') {
						var shopNoEn = JSON.stringify(en[i].address.match(/[0-9]{1,}/g, ''));
						var shopNoZt = JSON.stringify(zt[j].address.match(/[0-9]{1,}/g, ''));

						if (shopNoEn === shopNoZt) {
							branches.push(new Branch(en[i], zt[j]));
							zt.splice(j, 1);
							break;
						}
					} else {
						branches.push(new Branch(en[i], zt[j]));
						zt.splice(j, 1);
						break;
					}
				}
			}
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
	.map(['en', 'zt'], getBranches, {
		concurrency: 1
	})
	.then(mergeEnZtBranches)
	.then(removeMacau)
	.then(function(branches) {
		return new Promise(function(resolve) {

			//Sort branches by longitude
			branches.sort(function(a, b) {
				return a.loc[0] - b.loc[0];
			});

			// Save to branches.json
			fs.writeFileSync(__dirname + '/branches.json', JSON.stringify(branches, 0, 4), 'utf-8');
			console.log('Watsons: Save branches.json success!');
			console.log('Watsons: Finish.');

			resolve(branches);
		});
	})
	// Error handler
	.catch(function(error) {
		console.log('Watsons: ' + error);
	});

module.exports = branches;