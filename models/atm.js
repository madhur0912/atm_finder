var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AtmSchema = new Schema({
	"_id": String,
	"atm_type": String,
	"shop_type": String,
	"name": {
		"zh": String,
		"en": String
	},
	"area": {
		"zh": String,
		"en": String
	},
	"district": {
		"zh": String,
		"en": String
	},
	"address": {
		"zh": String,
		"en": String
	},
	"loc": Array,
	"service": {
		"zh": String,
		"en": String
	},
	"tel": String,
	"detail": {
		"zh": String,
		"en": String
	},
	"atm24": Boolean,
	"workHrs": {
		"monday": String,
		"tuesday": String,
		"wednesday": String,
		"thursday": String,
		"friday": String,
		"saturday": String,
		"sunday": String
	}
}, {
	collection: 'atm'
});

module.exports = mongoose.model('Atm', AtmSchema);