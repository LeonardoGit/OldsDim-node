/**
 * A model for Invitation 
 */
'use strict';

var mongoose = require('mongoose');


var invitationModel = function () {

	var invitationSchema = mongoose.Schema({
		group_id: String,
		user_email: String,
		status: String,
		created_on: Date,
		created_by: String
	});

	return mongoose.model('Invitation', invitationSchema);
}

module.exports = new invitationModel();