# atm_finder

Setup
=
A running mongoDB, port 27017
A google geocoder API key
npm

Install
=
First, clone/download the project.

Under the project directory, run
```
npm update
```
It will install/update all package you need.


Since some of the ATM and EPS merchants data need geocoder to translate their address to latitude, longitude.
You need to provide you Google geocoder API key to setup the database.

Next, `cd` to `updateData/`
```
cd updateData/
```
Create a file name `key.js`
```
touch key.js
```
Edit it
```
nano key.js
```
Paste and edit the line below
```
exports.geocoderKey = 'YOUR_GEOCODER_API_KEY';
```
Save it.


Lastly, run
```
node setupMongo.js < mongoDB_Host >
```
It will download all the ATM and EPS merchants data,
and import to you mongoDB.
