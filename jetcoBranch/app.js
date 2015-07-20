// example link
// http://www.jetco.com.hk/tc/xml/atm/2_1_10_0_atmDetails.xml

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
var banks = [];

var area_id_count = 0;
var district_id_count = 0;

// Get area_ids, return to the callback
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

// Input area_id, return district_ids to callback
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

      //console.log('AREA ID = ' + area_id + '\n');

      var district_ids_node = $('atm_districts').find('district_id');
      var district_ids = [];
      for (var i = 0; i < district_ids_node.length; i++) {
        district_ids.push($(district_ids_node[i]).text());
      };

      callback(error, area_id, district_ids);
    }
  );
}

// Input area_id and district_id, return atms to callback
var getDetails = function(area_id, district_id, callback) {
  var currentURL = url + detailPath.replace('AREA.ID', area_id).replace('DISTRICT.ID', district_id);

  request.get({
      url: currentURL
    },
    function(error, response, body) {
      if (error) {
        callback(error);
      }

      var $ = cheerio.load(body.replace(/area/g, 'aarea'));

      var atms = $('atms').find('atm');

      var results = [];

      //console.log('ARRAY! = ' + atms.length);

      for (var i = 0; i < atms.length; i++) {
        //console.log($(atms[i]).find('ob_name').text() + ' ' + $(atms[i]).find('addr').text());

        var name = $(atms[i]).find('ob_name').text();
        var serviceString = $(atms[i]).find('supp_tran').text();

        var branch = {
          atm_type: 'jetco',
          bank_type: name.substring(0, name.indexOf('銀行') + 2),
          name: $(atms[i]).find('ob_name').text(),
          area: $(atms[i]).find('aarea').text(),
          district: $(atms[i]).find('district').text(),
          address: $(atms[i]).find('addr').text(),
          service: serviceString.trim(),
          detail: null,
          atm24: true,
          lat: $(atms[i]).find('latitude').text(),
          lng: $(atms[i]).find('longitude').text(),
          workHrs: null
        };

        if (banks.indexOf(branch.bank_type) === -1) {
          banks.push(branch.bank_type);
        };

        results.push(branch);
      };

      callback(null, results);
    }
  );
}

getAreaIds(function(err, area_ids) {
  area_id_count = area_ids.length;
  if (err) {
    console.log(err);
  } else {
    for (var i = 0; i < area_ids.length; i++) {
      getDistrictIds(area_ids[i], function(err, area_id, district_ids) {
        area_id_count--;
        district_id_count += district_ids.length;
        for (var j = 0; j < district_ids.length; j++) {
          console.log('GO! ' + area_id + '_' + district_ids[j]);
          getDetails(area_id, district_ids[j], function(err, atms) {
            district_id_count--;
            branches = branches.concat(atms);

            if (area_id_count === 0 && district_id_count === 0) {
              console.log(branches);
              console.log(banks);
              fs.writeFileSync('./branches.json', JSON.stringify(branches, 0, 4), 'utf-8');
            };
          })
        };
      })
    };
  }
})