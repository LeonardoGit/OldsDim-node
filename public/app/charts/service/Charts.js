(function(){
'use strict';

angular
	.module('charts')
	.factory('Charts', Charts);

	Charts.$inject = ['State', '$http', '$q', 'HearstAPI'];
	/**
	 * @name Charts
	 * @desc API for charts
	 * @memberOf charts
	 */
	function Charts(State, $http, $q, HearstAPI) {
		var Charts = {};

		/** 
		 * @name getCharts
		 * @desc Get charts stored in the hearst API.
		 * @return {{JSON}} charts, charts created by all authors.
		 */
		Charts.getCharts = function() {
			//return HearstAPI.getCharts();
			return $http.get('/api/v1/charts/group/' + State.dim.group._id).then(function(response) {
				return response.data;
			});
		};

		/** 
		 * @name getCharts
		 * @desc Get charts stored in the hearst API.
		 * @return {{JSON}} charts, charts created by all authors.
		 */
		Charts.saveCharts = function(chartObj) {
			return $http.post('/api/v1/charts', chartObj).then(function(response) {
				return response.data;
			});
		};

		/** 
		 * @name deleteCharts
		 * @desc Delete chart entity, the related content entity is also deleted
		 * @params {{Array.Integers}} idArray, an array of chart ids to be deleted.
		 */
		Charts.deleteCharts = function(idArray) {
			//return HearstAPI.deleteCharts(idArray);
			return $http.delete('/api/v1/charts/' + idArray).then(function(response) {
				return response.data;
			});
		};

        Charts.getCVSFiles = function () {
            //return HearstAPI.getCVSFiles();
            //var def = $q.deferred;
            //def.resolve();
            return [{
                fileName: 'column-range.csv',
                filePath: 'column-range.csv'
            }, {
                fileName: 'bubble-chart.csv',
                filePath: 'bubble-chart.csv'
            }];
        };

		return Charts;
	}
})();