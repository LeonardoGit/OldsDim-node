/**
 * A model for File 
 */
'use strict';

var mongoose = require('mongoose');


var themeModel = function () {

	var themeSchema = mongoose.Schema({
		group_id: String,
		name: String,
		data: Array,
		type: String,
		core_theme: String,
		created_on: Date,
		created_by: String,
		modified_on: Date
	});

	return mongoose.model('Theme', themeSchema);
}

module.exports = new themeModel();