(function(){
'use strict';

angular
	.module('account')
	.service('User', User);

	/**
	 * @name Users
	 * @desc Service for Users
	 * @memberOf account
	 */
	function User() {
		this.profile = {};
	}

})();