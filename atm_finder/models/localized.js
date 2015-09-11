var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LocalisedSchema = new Schema({}, {
	collection: 'localized'
});

module.exports = mongoose.model('Localized', LocalisedSchema);