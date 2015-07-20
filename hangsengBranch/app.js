var http = require('http');
var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');
var sleep = require('sleep');

var geocoderProvider = 'google';
var httpAdapter = 'https';
// optionnal
var extra = {
  apiKey: 'AIzaSyAnWZsls0EtRKLWMeNZsJ_-qAWBJ3PanIM', // for Mapquest, OpenCage, Google Premier
  language: 'zh-hk',
  formatter: null // 'gpx', 'string', ...
};
var geocoder = require('node-geocoder')(geocoderProvider, httpAdapter, extra);

var url = 'http://bank.hangseng.com/1/2/chi/contact-us/branch-addresses';

var services = {
  'Disable': '輪椅通道',
  'ABC': '自助理財中心',
  'ATM': '自動櫃員機',
  'CHQ': '存票快入票機 截票時間',
  'SDB': '保管箱服務',
  'CDM': '存款快入數機',
  'SEC': '證券服務',
}

var branches = [];
var districts = [];
var geocodeCount = 0;

var getLatLng = function(array, index, callback) {

  var address = array[index].Address;

  var patch = JSON.parse(fs.readFileSync('patch.json', 'utf8'));

  console.log(geocodeCount);

  if (patch.hasOwnProperty(address)) {
    geocodeCount++;
    array[index].lat = patch[address][0];
    array[index].lng = patch[address][1];

    callback(null);
  } else {
    geocoder.geocode(array[index].Address, function(err, res) {
      geocodeCount++;

      if (err) {
        console.log('Error: ' + err);
        callback(err);
      };
      //console.log(res);

      if (typeof res[0] != 'undefined') {
        if (res[0].hasOwnProperty('latitude')) {
          array[index].lat = res[0].latitude;
          array[index].lng = res[0].longitude;
        } else {
          console.log('Index: ' + index + '\n' + JSON.stringify(res) + '\nhas no lat lng');
        }
      } else {
        console.log('Index: ' + index + ' ' + array[index].Name + ', ' + array[index].Address);
      }

      callback(null);
    });
  }
}

var recursiveGetLatLng = function() {
  if (geocodeCount === branches.length) {
    console.log('Get lat lng finish!!');
    console.log(branches);
    branches = formatBranches();
    fs.writeFileSync('./branches.json', JSON.stringify(branches, 0, 4), 'utf-8');
  } else {
    getLatLng(branches, geocodeCount, function() {
      sleep.usleep(1000000 / 5);
      recursiveGetLatLng();
    })
  }
}

var formatBranches = function() {
  var result = [];

  for (var i = 0; i < branches.length; i++) {
    console.log(i + ' ' + branches.length + '///////////////////////////////////////////////');
    console.log(branches[i]);

    if (!branches[i].ATM) {
      console.log('break!');
      continue;
    };

    var serviceString = branches[i].HourRemark.replace(/\/ /g, '\n');

    var serviceKeys = Object.keys(services);

    for (var j = 0; j < serviceKeys.length; j++) {
      if (branches[i][serviceKeys[j]]) {
        if (serviceKeys[j] === 'ATM' && branches[i]['ATMRMB']) {
          serviceString += services[serviceKeys[j]] + '(港幣及人民幣)' + '\n';
        } else if (serviceKeys[j] === 'CHQ') {
          serviceString += services[serviceKeys[j]] + ' ' + branches[i]['CHQCUT'] + '\n';
        } else {
          serviceString += services[serviceKeys[j]] + '\n';
        }
      }
    };

    var detailString = '自動櫃員機服務時間\n' + branches[i].HourAMB.replace(/<br\/>/g, '\n');

    var district = '';
    var area = '';

    for (var j = 0; j < districts.length; j++) {
      for (var k = 0; k < districts[j].SubDistricts.length; k++) {
        if (districts[j].SubDistricts[k].Code === branches[i].SubDistrict) {
          area = districts[j].Name;
          district = districts[j].SubDistricts[k].Name;
        }
      };
    };

    var atm24 = (JSON.stringify(branches[i]).indexOf('24小') != -1);

    var workHrs = null;

    if (branches[i].HourWeekdays != '') {
      workHrs = {
        "monday": branches[i].HourWeekdays,
        "tuesday": branches[i].HourWeekdays,
        "wednesday": branches[i].HourWeekdays,
        "thursday": branches[i].HourWeekdays,
        "friday": branches[i].HourWeekdays,
        "saturday": branches[i].HourSat,
        "sunday": "-"
      }
    };

    var branch = {
      atm_type: 'hsbc',
      bank_type: '恒生銀行',
      name: '恒生銀行 ' + branches[i].Name,
      area: area,
      district: district,
      address: branches[i].Address,
      service: serviceString.trim(),
      detail: detailString,
      atm24: atm24,
      lat: branches[i].lat,
      lng: branches[i].lng,
      workHrs: workHrs
    };

    console.log(branch);

    result.push(branch);
  };

  return result;
}

request.get({
  url: url
}, function(error, response, body) {
  if (error) {
    console.log('error: ' + error);
  }
  //console.log(body);

  var $ = cheerio.load(body);
  var text = $('script').text();
  text = text + '\n'
  //console.log(text);

  var start = text.indexOf('allSites ');
  var end = text.indexOf('var html');
  text = text.substring(start, end);

  text = text + '\nexports.allSites = allSites;\nexports.districts = districts;';
  text = text.replace(/<br\/>/, '/ ');

  fs.writeFileSync('./branches.js', text, 'utf-8');

  var readBranches = require('./branches.js');
  branches = readBranches.allSites;
  districts = readBranches.districts;

  recursiveGetLatLng();
});