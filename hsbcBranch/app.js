'use strict';

var Promise = require('bluebird');
var request = require('request');
var fs = require('fs');

var dataDir = './data/';
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

  console.log('creating');
  console.log(branch);

  // Set basic key-value
  this.atm_type = 'hsbc';
  this.bank_type = '匯豐銀行';
  this.name = '匯豐銀行 ' + branch.name;
  this.area = branch.address.prov;
  this.district = branch.address.city;
  this.address = branch.address.line1;
  this.detail = null;
  this.lat = branch.address.lat;
  this.lng = branch.address.lng;

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
  var serviceString = '';
  for (var j = 0; j < branch.services.length; j++) {
    serviceString = serviceString + branch.services[j].service + '\n';
  }

  this.service = serviceString.trim();
}

// Save response body
var saveResponseBody = function(filename, postData, body) {
  var text = JSON.stringify(postData, 0, 4) + ',\n' + JSON.stringify(body, 0, 4);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
  }
  fs.writeFileSync(dataDir + filename, text, 'utf-8');

  console.log('Save ' + filename + ' success!');
};

// Input a requestData,
// recursively find branches inside,
// return the Pormise of array of branches
var findBranches = function(requestData, route) {
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

      if (body.exceedMaximum) {

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
        saveResponseBody(route + '.json', postData, body);

        // Resolve it
        resolve(body.results);
      }
    }).on('error', function(error) {

      // Error
      reject(error);
    });
  });
};

// Start the recursion
findBranches(requestData, 'base')
  .then(function(branches) {

    console.log(branches.length);
    //Format all branches
    var formated = [];
    for (var i = 0; i < branches.length; i++) {

      // Add branch to branchesInDistrict
      formated.push(new Branch(branches[i]));
    }

    // Save to branches.json
    fs.writeFileSync('./branches.json', JSON.stringify(formated, 0, 4), 'utf-8');
  })
  .catch(function(error) {

    // Error
    console.log(error);
  });