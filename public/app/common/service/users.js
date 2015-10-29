(function(){
'use strict';

angular
	.module('dim')
	.factory('Users', Users);

	Users.$inject = ['$http'];

	/**
	 * @name Files
	 * @desc API for files
	 * @memberOf files
	 */
	function Users($http) {
		var Users = {};

		/** 
		 * @name getFiles
		 * @desc Get all files stored in the hearst API. (csv, images, pdf .etc)
		 * @return {{JSON}} charts, charts created by all authors.
		 */
		Users.getUserById = function(id) {
	    	return $http.get('/api/v1/users/' + id).then(function(response) {
                    return response.data;
                });
	    };

	    Users.getUserByUsername = function(username) {
	    	return $http.get('/api/v1/users/' + username).then(function(response) {
                    return response.data;
                });
	    };

	    return Users;
	}

})();