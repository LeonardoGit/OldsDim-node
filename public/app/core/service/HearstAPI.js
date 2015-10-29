(function() {
angular
	.module('core')
	.factory('HearstAPI', HearstAPI);

	HearstAPI.$inject = ['$http', '$filter', 'CONFIG', 'store'];

	/**
	 * @name HearstAPI
	 * @desc API for Hearst
	 * @memberOf core
	 */
	function HearstAPI($http, $filter, CONFIG, store) {

		var HearstAPI = {};

		/** 
		 * @name sessionUser
		 * @desc Get session of current user in the hearst API.
		 */
	    HearstAPI.sessionUser = function() {
			return $http.get(CONFIG.hearst.api.url  + 'auth/session/user')
					.then(function(response) {
						return response.data || {};
					});
	    };

		/** 
		 * @name contentReference
		 * @desc Bulk reference content entities to another entity in the hearst API.
		 */
		HearstAPI.contentReference = function(contentId, contentIdArray) {
	    	return $http.post(CONFIG.hearst.api.url + 'content/'+ contentId +'/ref/subcontent/' + contentIdArray);
	    };

	    /** 
		 * @name userReference
		 * @desc Rreference content entities to a user entity in the hearst API.
		 */
	    HearstAPI.userReference = function(contentId) {
			return $http.post(CONFIG.hearst.api.url  + 'content/' + contentId + '/ref/authors/' + store.get('user.profile').id);
	    };

		/** 
		 * @name getDashboards
		 * @desc Get dashboards stored in the hearst API.
		 * @return {{JSON}} dashboards, dashboards created by all authors.
		 */
		HearstAPI.getDashboards = function() {
			return $http.get(CONFIG.hearst.api.url + 'content-dashboards/ref/content/authors/?_limit=100')
					.then(function(response) {
						return formatDashboardResults(response);
					});
		};

		/** 
		 * @name getDashboard
		 * @desc Get dashboard stored in the hearst API.
		 * @return {{JSON}} dashboard, dashboard.
		 */
		HearstAPI.getDashboard = function(contentId) {
			return $http.get(CONFIG.hearst.api.url + 'content-dashboards/ref/content/' + contentId  + '/authors')
					.then(function(response) {
						return formatDashboardResults(response)[0];
					});
		};

		/** 
		 * @name saveDashboard
		 * @desc Save dashboard in the hearst API.
		 * @return {{JSON}} dashboard, saved dashboard object.
		 */
		HearstAPI.saveDashboard = function(title, data) {
			var dashboardObj = getdashboardObject($filter);
			dashboardObj.title = title;
			dashboardObj.data = data;
			dashboardObj = JSON.stringify(dashboardObj);

			return $http.post(CONFIG.hearst.api.url + 'content-dashboards/', dashboardObj)
                .then(function(response) {
                    return response;
                });
		};

		/** 
		 * @name deleteDashboards
		 * @desc Delete dashboard entity, the related content entity is also deleted
		 * @params {{Array.Integers}} idArray, an array of dashboard ids to be deleted.
		 */
		HearstAPI.deleteDashboards = function(idArray) {
			return $http.delete(CONFIG.hearst.api.url + 'content-dashboards/' + idArray);
		};

		/** 
		 * @name getCharts
		 * @desc Get charts stored in the hearst API.
		 * @return {{JSON}} charts, charts created by all authors.
		 */
		HearstAPI.getCharts = function() {
			return $http.get(CONFIG.hearst.api.url + 'content-charts/ref/content/authors/?_limit=100')
					.then(function(response) {
						return formatChartResults(response);
					});
		};

		/** 
		 * @name deleteCharts
		 * @desc Delete chart entity, the related content entity is also deleted
		 * @params {{Array}} idArray, an array of chart ids to be deleted.
		 */
		HearstAPI.deleteCharts = function(idArray) {
			return $http.delete(CONFIG.hearst.api.url + 'content-charts/' + idArray);
		};

		/** 
		 * @name getFiles
		 * @desc Get all files stored in the hearst API. (csv, images, pdf .etc)
		 * @return {{JSON}} charts, charts created by all authors.
		 */
		HearstAPI.getFiles = function() {
			return $http.get(CONFIG.hearst.api.url + 'users/ref/keys/files/?key.id=14021&_limit=100')
					.then(function(response) {
						return formatFileResults(response);
					});
		};

		/** 
		 * @name deleteFiles
		 * @desc Delete file entity. // TODO Batch file deletion.
		 * @params {{Number}} id, file id to be deleted.
		 */
		HearstAPI.deleteFiles = function(id) {
			return $http.delete(CONFIG.hearst.api.url + 'files/' + id);
		};

		/** 
		 * @name uploadFile
		 * @desc Upload file to hearst API.
		 * @params {{file}} file, file object to be uploaded.
		 */
		HearstAPI.uploadFile = function(file, type) {
			// TYPE: files, thumbnails, backgrounds
			var filePath = CONFIG.aws[type];

			return $http({
						method: 'POST',
						url: CONFIG.hearst.api.url + 'files/upload-copy/',
						headers: { 'Content-Type': undefined },
						transformRequest: function (data) {
							var formData = new FormData();
							var keys = Object.keys(data);
							var appendArrayValue = function(valueItem, idx){
							  formData.append(key+'['+idx+']',valueItem);
							};

							for (var i=0;i<keys.length; i++){
							  var key = keys[i];
							  var value = data[key];

							  if (angular.isArray(value)){angular.forEach(value, appendArrayValue);}
							  else {formData.append(key,value);}
							}
							  return formData;
						},
						data: {
							bucket: filePath.bucket,
							path: filePath.path + file.name,
							key: filePath.key,
							public: filePath.public,
							persist_source: filePath.persist_source,
							files: file,
							meta: filePath.meta						}
					});
      	};

		return HearstAPI;
	}

	function formatDashboardResults(response) {
		var dashboards = [];
		angular.forEach(response.data.results, function(result) {
			var dashboard = result.ref[0].dashboard;
			dashboard.contentId = result.ref[0].content.id;
			dashboard.title = result.ref[0].content.title;
			dashboard.author = result.ref[1].author;
			dashboard.author.full_name = dashboard.author.first_name + ' ' + dashboard.author.last_name;
			dashboards.push(dashboard);
		});

		return dashboards;
	}

	function formatChartResults(response) {
		var charts = [];
		angular.forEach(response.data.results, function(result) {
			var chart = result.ref[0].chart;
			chart.author = result.ref[1].author;
			chart.author.full_name = chart.author.first_name + ' ' + chart.author.last_name;
			charts.push(chart);
		});

		return charts;
	}

	function formatFileResults(response) {
		var files = [];
		angular.forEach(response.data.results, function(result) {
			var file = result.ref[1].file;
			if(file.mime_type === "text/plain") {
				file.key = result.ref[1].key;
				file.author = result.ref[0].user;
				file.author.full_name = file.author.first_name + ' ' +file.author.last_name;
				files.push(file);
			}
		});

		return files;
	}

	function getdashboardObject($filter) {
		var dashboardObj = {
	        status: 0,
	        datetime_published: {
	          date: {
	            year: $filter('date')(new Date(), 'yyyy'),
	            month: $filter('date')(new Date(), 'MM'),
	            day: $filter('date')(new Date(), 'dd')
	          },
	          time: {
	            hour: $filter('date')(new Date(), 'HH'),
	            minute: $filter('date')(new Date(), 'mm')
	          }
	        },
	        datetime_expired: {
	          date: {
	            year: $filter('date')(new Date(), 'yyyy'),
	            month: $filter('date')(new Date(), 'MM'),
	            day: $filter('date')(new Date(), 'dd')
	          },
	          time: {
	            hour: $filter('date')(new Date(), 'HH'),
	            minute: $filter('date')(new Date(), 'mm')
	          }
	        },
	        title: '',
	        url: '',
	        type: 'dashboard',
	        description: '',
	        data: {}
	      };

	    return dashboardObj;
	}

})();