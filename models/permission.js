/**
 * A model for Permission
 */
'use strict';

var mongoose = require('mongoose');


var permissionModel = function () {

	var permissionSchema = mongoose.Schema({
		name: {type: String, unique: true}
	});

	return mongoose.model('Permission', permissionSchema);
}

module.exports = new permissionModel();