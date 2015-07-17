var http = require('http');
var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');

var url = 'http://bank.hangseng.com/1/2/chi/contact-us/branch-addresses';

var branches = [];

request.get({
    url: url
  },
  function(error, response, body) {
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

    text = text + '\nmodule.exports = allSites;';

    fs.writeFileSync('./branches.js', text, 'utf-8');

    var allSites = require('./branches.js');
    console.log(allSites);

    fs.writeFileSync('./branches.json', JSON.stringify(allSites, 0, 4), 'utf-8');
  }
);