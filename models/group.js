/**
 * A model for Group 
 */
'use strict';

var mongoose = require('mongoose');


var groupModel = function () {

	var groupSchema = mongoose.Schema({
		name: String,
		members: Array,
		data: Object,
		created_on: Date,
		created_by: String,
		modified_on: Date
	});

	return mongoose.model('Group', groupSchema);
}

module.exports = new groupModel();