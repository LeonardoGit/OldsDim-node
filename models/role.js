/**
 * A model for Role 
 */
'use strict';

var mongoose = require('mongoose');


var roleModel = function () {

	var roleSchema = mongoose.Schema({
		group_id: String,
		permission_id: Array,
		name: String,
		core_role: String,
		created_on: Date,
		created_by: String,
		modified_on: Date
	});

	return mongoose.model('Role', roleSchema);
}

module.exports = new roleModel();