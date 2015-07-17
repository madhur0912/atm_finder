var http = require('http');
var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');

var url = 'http://www.jetco.com.hk/tc/xml/atm/';

// Hong Kong Region number = 2
var areaPath = '2_atmArea.xml';
var districtPath = 'AREA.ID_atmDistrict.xml';
var detailPath = '2_AREA.ID_DISTRICT.ID_0_atmDetails.xml';

var branches = [];
var areaCount = 0;
var districtCount = 0;

var getAreaIds = function(callback) {
  request.get({
      url: url + areaPath
    },
    function(error, response, body) {
      if (error) {
        callback(error);
      }

      var $ = cheerio.load(body);

      var area_ids_node = $('atm_areas').find('area_id');
      var area_ids = [];
      for (var i = 0; i < area_ids_node.length; i++) {
        console.log(i + ' = ' + $(area_ids_node[i]).text());
        area_ids.push($(area_ids_node[i]).text());
      };

      callback(error, area_ids);
    }
  );
};

var getDistrictIds = function(area_id, callback) {
  request.get({
      url: url + districtPath.replace('AREA.ID', area_id)
    },
    function(error, response, body) {
      if (error) {
        callback(error);
      }
      // console.log(body);

      var $ = cheerio.load(body);

      console.log('AREA ID = ' + area_id + '\n');

      var district_ids_node = $('atm_districts').find('district_id');
      var district_ids = [];
      for (var i = 0; i < district_ids_node.length; i++) {
        district_ids.push($(district_ids_node[i]).text());
      };

      callback(error, area_id, district_ids);
    }
  );
}

var getDetail = function(area_id, district_id, callback) {
  var currentURL = url + detailPath.replace('AREA.ID', area_id).replace('DISTRICT.ID', district_id);

  request.get({
      url: currentURL
    },
    function(error, response, body) {
      if (error) {
        callback(error);
      }

      var $ = cheerio.load(body);

      var atms = $('atms').find('atm');

      console.log('ARRAY! = ' + atms.length);

      for (var i = 0; i < atms.length; i++) {
        console.log($(atms[i]).find('ob_name').text() + ' ' + $(atms[i]).find('addr').text());

        var branch = {
          name: $(atms[i]).find('ob_name').text(),
          address: $(atms[i]).find('addr').text(),
          lat: $(atms[i]).find('latitude').text(),
          long: $(atms[i]).find('longitude').text()
        }

        branches.push(branch);
      };

      callback(null, branches);
    }
  );
}

getAreaIds(function(err, area_ids) {
  if (err) {
    console.log(err);
  } else {
    for (var i = 0; i < area_ids.length; i++) {
      getDistrictIds(area_ids[i], function(err, area_id, district_ids) {
        for (var j = 0; j < district_ids.length; j++) {

          console.log('GO! ' + area_id + '_' + district_ids[j]);
          getDetail(area_id, district_ids[j], function(err, details) {


          })
        };
      })
    };
  }
})