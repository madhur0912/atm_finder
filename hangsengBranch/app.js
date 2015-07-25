'use strict';

/**
 * Download all Hang Seng branch infos, parse it and save to branches.json
 */
var Promise = require('bluebird');
var fs = require('fs');
var $ = require('cheerio');
var request = require('request');
var sleep = require('sleep');

// Geocoder
var geocoderProvider = 'google';
var httpAdapter = 'https';
var extra = {
  apiKey: 'AIzaSyAnWZsls0EtRKLWMeNZsJ_-qAWBJ3PanIM', // for Mapquest, OpenCage, Google Premier
  language: 'zh-hk',
  formatter: null // 'gpx', 'string', ...
};
var geocoder = require('node-geocoder')(geocoderProvider, httpAdapter, extra);

// Path
var dataDir = './data/';
var patchDir = './patch/';
var geocodeJsonPath = dataDir + 'geocode.json';
var url = 'http://bank.hangseng.com/1/2/chi/contact-us/branch-addresses';

// Services Key-String pair
var services = {
  'Disable': '輪椅通道',
  'ABC': '自助理財中心',
  'ATM': '自動櫃員機',
  'CHQ': '存票快入票機 截票時間',
  'SDB': '保管箱服務',
  'CDM': '存款快入數機',
  'SEC': '證券服務',
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
    var address = branch.address;
    var name = branch.name;
    var patch = JSON.parse(fs.readFileSync(patchDir + 'patch.json', 'utf8'));

    if (patch.address.hasOwnProperty(address)) {
      // If address exist in patch
      // Set .lat and .lng
      // and resolve it
      branch.lat = patch.address[address][0];
      branch.lng = patch.address[address][1];

      resolve(branch);
    } else if (patch.name.hasOwnProperty(name)) {
      // If name exist in patch
      // Set .lat and .lng
      // and resolve it
      branch.lat = patch.name[name][0];
      branch.lng = patch.name[name][1];

      resolve(branch);
    } else {

      // Not exist in patch
      // Use geocoder to find lat and long
      geocoder.geocode(address.replace('港鐵', ''))
        .then(function(res) {

          console.log(res[0]);

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
          branch.lat = res[0].latitude;
          branch.lng = res[0].longitude;
          sleep.usleep(1000000 / 4);
          resolve(branch);
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
    var serviceString = branch.HourRemark.replace(/\/ /g, '\n');

    // For every services
    var serviceKeys = Object.keys(services);
    for (var i = 0; i < serviceKeys.length; i++) {
      // If that branch has that service
      if (branch[serviceKeys[i]]) {
        if (serviceKeys[i] === 'ATM' && branch.ATMRMB) {

          // If the key is 'ATM' and 'ATMRMB' is also true
          // Add ATM and ATMRMB string to serviceString
          serviceString += services[serviceKeys[i]] + '(港幣及人民幣)' + '\n';
        } else if (serviceKeys[i] === 'CHQ') {

          // If the key is 'CHQ'
          // Add CHQ and CHQCUT string to serviceString
          serviceString += services[serviceKeys[i]] + ' ' + branch.CHQCUT + '\n';
        } else {

          // Else, add the service string
          serviceString += services[serviceKeys[i]] + '\n';
        }
      }
    }

    // Set detailString to be ATM working hour
    var detailString = '自動櫃員機服務時間\n' + branch.HourAMB.replace(/<br\/>/g, '\n');

    // Set atm24
    var atm24 = (JSON.stringify(branch).indexOf('24小') != -1);

    // Set workHrs
    var workHrs = workingHourFromBranch(branch);

    var result = {
      atm_type: 'hsbc',
      bank_type: '恒生銀行',
      name: '恒生銀行 ' + branch.Name,
      area: branch.area,
      district: branch.district,
      address: branch.Address,
      service: serviceString.trim(),
      detail: detailString,
      atm24: atm24,
      workHrs: workHrs
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

  console.log('Save ' + filename + ' success!');
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
var getAllBranches = function() {
  return new Promise(function(resolve, reject) {

    // Get the html file which contains the branch data
    request
      .get(url, function(error, response, body) {

        // Save the response body
        saveResponseBody('/body.html', body);

        // Cut out the useful script
        var text = $(body).find('script').text();
        var start = text.indexOf('allSites ');
        var end = text.indexOf('var html');
        text = text.substring(start, end);

        // Add some code to exports the branch array and district array
        text = text + '\nexports.allSites = allSites;\nexports.districts = districts;';
        text = text.replace(/<br\/>/, '/ ');

        // Save it to branches.js
        fs.writeFileSync(dataDir + 'branches.js', text, 'utf-8');

        // Read it
        var readBranches = require(dataDir + 'branches.js');
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

// Delete previous geocode.json
fs.unlink(geocodeJsonPath, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('successfully deleted ' + geocodeJsonPath);
  }
});

// Start the Promise
Promise
  .try(getAllBranches)
  .map(formatBranch)
  .map(branchGetLatLong, {
    concurrency: 1
  })
  .then(function(branches) {


    for (var i = 0; i < branches.length; i++) {
      for (var j = 0; j < branches.length; j++) {
        if (branches[i].lat === branches[j].lat && branches[i].lng === branches[j].lng && i !== j) {
          console.log('////////////////////////////////////')
          console.log(JSON.stringify(branches[i]) + '\n=\n' + JSON.stringify(branches[j]));
        };
      };
    };

    fs.writeFileSync('./branches.json', JSON.stringify(branches, 0, 4), 'utf-8');
    console.log('Save branches.json success!');
    console.log('Finish.');
  });