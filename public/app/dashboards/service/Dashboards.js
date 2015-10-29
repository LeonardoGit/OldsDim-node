(function(){
'use strict';

angular
	.module('dashboards')
	.factory('Dashboards', Dashboards);

	Dashboards.$inject = ['State', '$http', 'HearstAPI'];

	/**
	 * @name Dashboards
	 * @desc API for dashboards
	 * @memberOf dashboards
	 */
	function Dashboards(State, $http, HearstAPI) {
		var Dashboards = {};

		/** 
		 * @name getDashboards
		 * @desc Get dashboards stored in the hearst API.
		 * @return {{JSON}} dashboards, dashboards created by all authors.
		 */
		Dashboards.getDashboards = function() {
			//return HearstAPI.getDashboards();

			return $http.get('/api/v1/dashboards/group/' + State.dim.group._id).then(function(response) {
				return response.data;
			});
		};

		/** 
		 * @name getDashboard
		 * @desc Get dashboard stored in the hearst API.
		 * @return {{JSON}} dashboard, dashboard object.
		 */
		Dashboards.getDashboard = function(id) {
			//return HearstAPI.getDashboard(contentId);

			return $http.get('/api/v1/dashboards/' + id).then(function(response) {
				return response.data;
			});
		};

		/** 
		 * @name saveDashboard
		 * @desc Save dashboard in the hearst API.
		 * @return {{JSON}} dashboard, saved dashboard object.
		 */
		Dashboards.saveDashboard = function(dashboardObj) {
			// return HearstAPI.saveDashboard(title, data)
			// 		.then(function(response) {
			// 			return HearstAPI.userReference(response.data.content.id);
			// 		});

			return $http.post('/api/v1/dashboards', dashboardObj).then(function(response) {
				return response.data;
			});
		};

		/** 
		 * @name deleteDashboards
		 * @desc Delete dashboard entity, the related content entity is also deleted
		 * @params {{Array.Integers}} idArray, an array of dashboard ids to be deleted.
		 */
		Dashboards.deleteDashboards = function(idArray) {
			//return HearstAPI.deleteDashboards(idArray);
			return $http.delete('/api/v1/dashboards/' + idArray).then(function(response) {
				return response.data;
			});
		};

		/** 
		 * @name contentReference
		 * @desc Bulk reference content entities to another entity in the hearst API.
		 */
		HearstAPI.contentReference = function(contentId, contentIdArray) {
	    	return HearstAPI.contentReference(contentId, contentIdArray);
	    };

		return Dashboards;
	}
})();