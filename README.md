# atm_finder

Setup
=
A mongoDB

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

Then, `cd` to `updateData/`
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


Next, run
```
node setupMongo.js MONGO_DB_URI
```
You could leave the MONGO_DB_URI empty, it will use default uri `mongodb://localhost:27017`.

It will download all the ATM and EPS merchants data, and import to you mongoDB.

Lastly, run
```
npm start MONGO_DB_URI (DEFAULT: mongodb://localhost:27017)
```
You server is ready!
