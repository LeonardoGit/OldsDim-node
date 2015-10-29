(function(){
'use strict';

angular
	.module('charts')
	.controller('ChartsListCtrl', ChartsListCtrl);

	ChartsListCtrl.$inject = ['State', '$scope', 'SweetAlert', '$modal', 'Charts'];

	/**
	 * @name ChartsListCtrl
	 * @desc List charts in list and grid views.
	 * @memberOf charts
	 */
	function ChartsListCtrl(State, $scope, SweetAlert, $modal, Charts) {
		$scope.loading = true;
		$scope.view = 'list';
		$scope.displayView = displayView;
		$scope.charts = [];
		$scope.predicate = 'title';
		$scope.reverse = true;
		$scope.order = order;
		$scope.selectedCharts = [];
		$scope.selected = selected;
		$scope.selectChart = selectChart;
		$scope.selectAllCharts = selectAllCharts;
		$scope.deleteAllCharts = deleteAllCharts;
		$scope.deleteChart = deleteChart;
		$scope.shareChart = shareChart;

		init();

		function init() {
			loadCharts();
		}

		/*
		 * TODO: REMOVE, Temporaily here to create charts.
		 */
		$scope.createChart = createChart;
		function createChart() {

			var newChart = {
				group_id: State.dim.group._id,
				title: 'New Chart Added from API ' + $scope.charts.length,
				type: 'Pie',
				data: {},
				file: {
					bucket: "www.dashboardinaminute.com",
					data: [],
					name: "monthly-average-rainfall.csv",
					path: "files/csv/140215567ba26dd7e66.20074778-10-bar-with-negative-value-csv.csv"
				},
				modified_by: State.dim.user(),
				created_by: State.dim.user()
			};

			Charts.saveCharts(newChart).then(function(chart) {
				$scope.charts.push(chart);
			});
		}

		/** 
		 * @name displayView
		 * @desc Open loadingCharts modal and load charts.
		 */
		function displayView(type) {
			return !$scope.loading && ($scope.view === type);
		}

		/** 
		 * @name loadCharts
		 * @desc Open loadingCharts modal and load charts.
		 */
		function loadCharts() {
			$modal.open({
			  templateUrl: 'app/charts/modals/loadCharts/loadCharts.html',
			  controller: 'LoadchartsCtrl'
			}).result.then(function(charts){
			  $scope.charts = charts;
                    console.log(charts);
			  $scope.loading = false;
			});	
		}

		/** 
		 * @name order
		 * @desc Change descending and ascending order of predicate.
		 */
		function order(predicate) {
			$scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
			$scope.predicate = predicate;
		}

		/** 
		 * @name selectAllCharts
		 * @desc Add or Remove all charts from $scope.selectedCharts.
		 * @params {{Boolean}} selectAll, are we adding or removing charts.
		 */
		function selectAllCharts(selectAll) {
			if(selectAll) {
				$scope.selectedCharts = angular.copy($scope.charts);
			} else {
				$scope.selectedCharts = [];
			}
		}

		/** 
		 * @name selectChart
		 * @desc Check if chart is in $scope.selectedCharts.
		 * @params {{Object}} chart, a chart object.
		 */
		function selectChart(chart) {
			if(selected(chart)) {
				$scope.selectedCharts = _.reject($scope.selectedCharts, function(item) {
					return item._id === chart._id;
				});
			} else {
				$scope.selectedCharts.push(chart);
			}
		}

		/** 
		 * @name selected
		 * @desc Check if chart is selected, in $scope.selectedCharts.
		 * @params {{Object}} chart, a chart object.
		 * @return {{Boolean}} returns undefined if chart is not found.
		 */
		function selected(chart) {
			return _.findWhere($scope.selectedCharts, {
				id: chart._id
			});
		}

		/** 
		 * @name Delete All Charts
		 * @desc Display a sweetalert to confirm charts deletion.
		 * On cancel deletion, display a message that the charts
		 * are safe and have not been deleted.
		 * On delete, display a message that the charts have been deleted.
		 */
		function deleteAllCharts() {
			var numberOfSelectedCharts = $scope.selectedCharts.length;

			if(numberOfSelectedCharts > 0) {
				SweetAlert.swal({
				   title: 'Are you sure?',
				   text: 'You will not be able to recover these ' + numberOfSelectedCharts + ' charts!',
				   type: "warning",
				   showCancelButton: true,
				   confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete them!",
				   cancelButtonText: "No, cancel please!",
				   closeOnConfirm: false,
				   closeOnCancel: false }, 
				function(isConfirm){ 
				   if (isConfirm) {
				   		Charts
			   				.deleteCharts(getIdArray($scope.selectedCharts))
			   				.then(success, error);
				   } else {
				      SweetAlert.swal("Cancelled", "Your charts are safe :)", "error");
				   }
				});
			}

			function getIdArray(charts) {
				var idArray = [];
				angular.forEach(charts, function(chart) { 
					idArray.push(parseInt(chart._id, 10));
		   		});

				return idArray;
			}

			function success(response) {
				// remove charts from charts array.
		   		angular.forEach($scope.selectedCharts, function(chart) { 
		   			$scope.charts = _.reject($scope.charts, function(item) {
						return item._id === chart._id;
					});
		   		});
		   		// empty selected charts array.
		   		$scope.selectedCharts = [];
				SweetAlert.swal("Deleted!", "Your charts have been deleted.", "success");
			}

			function error(response) {
				SweetAlert.swal('Error', 'Server error ' +  response.data.code + ': ' + response.data.message, 'error');
			}
		}

		/** 
		 * @name Delete Chart
		 * @desc Display a sweetalert to confirm chart deletion.
		 * On cancel deletion, display a message that the chart
		 * is safe and has not been deleted.
		 * On delete, display a message that the chart has been deleted.
		 * @params {{Object}} chart, a chart object.
		 */
		function deleteChart(chart) {
			SweetAlert.swal({
			   title: "Are you sure?",
			   text: "You will not be able to recover this chart!",
			   type: "warning",
			   showCancelButton: true,
			   confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
			   cancelButtonText: "No, cancel please!",
			   closeOnConfirm: false,
			   closeOnCancel: false }, 
			function(isConfirm){ 
			   if (isConfirm) {
			   		Charts
		   				.deleteCharts(chart._id)
		   				.then(success, error);
			   } else {
			      SweetAlert.swal("Cancelled", "Your chart is safe :)", "error");
			   }
			});

			function success(response) {
				// remove chart from charts array.
		   		$scope.charts = _.reject($scope.charts, function(item) {
					return item._id === chart._id;
				});
				$scope.selectedCharts = _.reject($scope.selectedCharts, function(item) {
					return item._id === chart._id;
				});
				SweetAlert.swal("Deleted!", "Your chart has been deleted.", "success");	
			}

			function error(response) {
				SweetAlert.swal('Error', 'Server error ' +  response.data.code + ': ' + response.data.message, 'error');
			}
		}

		/** 
		 * @name Share Chart
		 * @desc Display a modal for user to copy the share url
		 * or iframe for the chart selected.
		 * @params {{Number}} chartId, the chart id. 
		 */
		function shareChart(chartId) {
			$modal.open({
			  templateUrl: 'app/charts/modals/shareChart/shareChart.html',
			  controller: 'SharechartCtrl',
			  resolve: {
		        chartId: function () {
		          return chartId;
		        }
		      }
			})
		}

		/** 
		 * @desc Watch for group change and load group charts.
		 */
		$scope.$watch(function() {
                return State.dim.group._id
            }, function(newGroup, oldGroup) {
            if(newGroup !== oldGroup) {
                loadCharts();
            }
        });


        // TO: REMOVE, used becuase we don't have charts with data.
        $scope.chartConfig = {
                    options: {
                        xAxis: {
                            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                        },
                        yAxis: {
                            title: {
                                text: 'Temperature (°C)'
                            },
                            plotLines: [{
                                value: 0,
                                width: 1,
                                color: '#808080'
                            }]
                        },
                        exporting: false,
                        tooltip: {
                            valueSuffix: '°C'
                        }
                    },
                    series: [{
                        name: 'Tokyo',
                        data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
                    }, {
                        name: 'New York',
                        data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
                    }, {
                        name: 'Berlin',
                        data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
                    }, {
                        name: 'London',
                        data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
                    }]
                }
	}
})();