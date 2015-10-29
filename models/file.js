/**
 * A model for File 
 */
'use strict';

var mongoose = require('mongoose');


var fileModel = function () {

	var fileSchema = mongoose.Schema({
		group_id: String,
		name: String,
		url: String,
		bucket: String,
		created_on: Date,
		created_by: String,
		modified_on: Date,
		modified_by: String
	});

	return mongoose.model('File', fileSchema);
}

module.exports = new fileModel();