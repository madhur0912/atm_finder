var request = require('request');
var fs = require('fs');

var url = 'https://www.hsbc.com.hk/gpib/channel/proxy/abslSvc/enqBranchABSL';

var branches = [];
var count = 0;
var falseCount = 0;
var falseNeed = 1;

var requestData = {
  "countryCode": "HK",
  "locale": "zh-hk",
  "locationTypes": [{
    "locationType": "ssb" //only search ssb, means ATM
    // }, {
    //   "locationType": "branch"
    // }, {
    //   "locationType": "hpc"
    // }, {
    //   "locationType": "ctc"
  }],
  "services": [{
    "service": "show-all-results"
  }],
  "cLat": 22.397467790332893,
  "cLng": 114.13346995736697,
  "bottomLeftLat": 22.044683115235397,
  "bottomLeftLng": 113.58415355111697,
  "topRightLat": 22.749359536368125,
  "topRightLng": 114.68278636361697
};

var twentyFourHours = {
  "monday": "00:00 - 23:59",
  "tuesday": "00:00 - 23:59",
  "wednesday": "00:00 - 23:59",
  "thursday": "00:00 - 23:59",
  "friday": "00:00 - 23:59",
  "saturday": "00:00 - 23:59",
  "sunday": "00:00 - 23:59"
};

var findBranch = function(requestData, callback) {
  console.log('Find ' + JSON.stringify(requestData));
  request.post({
      url: url,
      method: "POST",
      json: true,
      headers: {
        "content-type": "application/json",
      },
      body: requestData
    },
    function(error, response, body) {
      if (error) {
        console.log('error: ' + error);
      }

      if (body.exceedMaximum) {
        console.log('Maximum');

        return callback(true);

      } else {
        console.log('MIN!');

        return callback(false, body.results);
      }
    }
  );
};

var recursiveFindBranch = function(requestData, callback) {
  findBranch(requestData, function(exceedMaximum, results) {
    if (exceedMaximum) {
      var cLat = requestData.cLat;
      var cLng = requestData.cLng;
      var bottomLeftLat = requestData.bottomLeftLat;
      var bottomLeftLng = requestData.bottomLeftLng;
      var topRightLat = requestData.topRightLat;
      var topRightLng = requestData.topRightLng;

      var topLeft = JSON.parse(JSON.stringify(requestData));
      var topRight = JSON.parse(JSON.stringify(requestData));
      var bottomLeft = JSON.parse(JSON.stringify(requestData));
      var bottomRight = JSON.parse(JSON.stringify(requestData));

      // TOP RIGHT
      topRight.bottomLeftLat = cLat;
      topRight.bottomLeftLng = cLng;
      topRight.cLat = (topRight.topRightLat + topRight.bottomLeftLat) / 2.0;
      topRight.cLng = (topRight.topRightLng + topRight.bottomLeftLng) / 2.0;

      // BOTTOM LEFT
      bottomLeft.topRightLat = cLat;
      bottomLeft.topRightLng = cLng;
      bottomLeft.cLat = (bottomLeft.topRightLat + bottomLeft.bottomLeftLat) / 2.0;
      bottomLeft.cLng = (bottomLeft.topRightLng + bottomLeft.bottomLeftLng) / 2.0;

      // TOP LEFT
      topLeft.bottomLeftLng = bottomLeftLng;
      topLeft.topRightLng = cLng;
      topLeft.bottomLeftLat = cLat;
      topLeft.topRightLat = topRightLat;
      topLeft.cLat = (topLeft.bottomLeftLat + topLeft.topRightLat) / 2.0;
      topLeft.cLng = (topLeft.bottomLeftLng + topLeft.topRightLng) / 2.0;

      // BOTTOM RIGHT
      bottomRight.bottomLeftLng = cLng;
      bottomRight.topRightLng = topRightLng;
      bottomRight.bottomLeftLat = bottomLeftLat;
      bottomRight.topRightLat = cLat;
      bottomRight.cLat = (bottomRight.bottomLeftLat + bottomRight.topRightLat) / 2.0;
      bottomRight.cLng = (bottomRight.bottomLeftLng + bottomRight.topRightLng) / 2.0;

      recursiveFindBranch(topLeft, callback);
      recursiveFindBranch(topRight, callback);
      recursiveFindBranch(bottomLeft, callback);
      recursiveFindBranch(bottomRight, callback);
      falseNeed = falseNeed - 1 + 4;
    } else {
      falseCount = falseCount + 1;
      callback(false, results);
    }
  })
};

var formatBranches = function() {
  for (var i = 0; i < branches.length; i++) {

    var addressObj = branches[i].address;

    var address = addressObj.line1;

    var string = JSON.stringify(branches[i]);

    var atm24 = (string.indexOf('00:00 - 23:59') != -1) || (string.indexOf('24小時') != -1);

    var serviceString = '';

    for (var j = 0; j < branches[i].services.length; j++) {
      serviceString = serviceString + branches[i].services[j].service + '\n';
    };

    var firstUseful = JSON.stringify(branches[i].workHrs.lobby).indexOf(' - ') != -1;
    var secondUseful = JSON.stringify(branches[i].workHrs.driveThru).indexOf(' - ') != -1;

    if (secondUseful) {
      secondUseful = (JSON.stringify(branches[i].workHrs.driveThru).indexOf('00:00 - 23:59') === -1);
    };

    var workHrs = null;

    if (firstUseful && secondUseful) {
      if (JSON.stringify(branches[i].workHrs.lobby) === JSON.stringify(branches[i].workHrs.driveThru)) {
        workHrs = branches[i].workHrs.lobby;
      } else {
        workHrs = null;
      }
    } else if (firstUseful) {
      workHrs = branches[i].workHrs.lobby;
    } else if (secondUseful) {
      workHrs = branches[i].workHrs.driveThru;
    }

    var branch = {
      atm_type: 'hsbc',
      bank_type: '匯豐銀行',
      name: '匯豐銀行 ' + branches[i].name,
      area: addressObj.prov,
      district: addressObj.city,
      address: address,
      service: serviceString.trim(),
      detail: null,
      atm24: atm24,
      lat: addressObj.lat,
      lng: addressObj.lng,
      workHrs: workHrs
    };

    branches[i] = branch;
  };
}

recursiveFindBranch(requestData, function(exceedMaximum, results) {
  if (!exceedMaximum) {
    count++;
    branches = branches.concat(results);
  }
  if (falseNeed === falseCount) {
    console.log(JSON.stringify(branches, 0, 4) + '\nCOUNT:' + count + '\nLength:' + branches.length);
    formatBranches();
    fs.writeFileSync('./branches.json', JSON.stringify(branches, 0, 4), 'utf-8');
  } else {
    console.log(falseNeed + ' != ' + falseCount);
  }
});