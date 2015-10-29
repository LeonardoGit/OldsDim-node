/**
 * A model for Chart 
 */
'use strict';

var mongoose = require('mongoose');


var chartModel = function () {

	var chartSchema = mongoose.Schema({
		group_id: String,
		title: String,
		type: String,
		file: Object,
		data: Object,
		created_on: Date,
		created_by: Object,
		modified_on: Date,
		modified_by: Object
	});

	return mongoose.model('Chart', chartSchema);
}

module.exports = new chartModel();