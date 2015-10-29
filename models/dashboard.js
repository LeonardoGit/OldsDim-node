/**
 * A model for Dashboard 
 */
'use strict';

var mongoose = require('mongoose');


var dashboardModel = function () {

	var dashboardSchema = mongoose.Schema({
		group_id: String,
		chart_ids: Array,
		title: String,
		data: Object,
		created_on: Date,
		created_by: Object,
		modified_on: Date,
		modified_by: Object
	});

	return mongoose.model('Dashboard', dashboardSchema);
}

module.exports = new dashboardModel();