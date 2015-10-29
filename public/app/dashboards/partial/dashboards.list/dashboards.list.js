(function(){
'use strict';

angular
	.module('dashboards')
	.controller('DashboardsListCtrl', DashboardsListCtrl);

	DashboardsListCtrl.$inject = ['State', '$scope', '$state', 'SweetAlert', '$modal', 'Dashboards'];

	/**
	 * @name DashboardsListCtrl
	 * @desc List dashboard in list and grid views.
	 * @memberOf dashboards
	 */
	function DashboardsListCtrl(State, $scope, $state, SweetAlert, $modal, Dashboards) {
		$scope.loading = true;
		$scope.view = 'list';
		$scope.displayView = displayView;
		$scope.dashboards = [];
		$scope.predicate = 'title';
		$scope.reverse = true;
		$scope.order = order;
		$scope.selectedDashboards = [];
		$scope.selected = selected;
		$scope.selectDashboard = selectDashboard;
		$scope.selectAllDashboards = selectAllDashboards;
		$scope.editDashboard = editDashboard;
		$scope.deleteAllDashboards = deleteAllDashboards;
		$scope.deleteDashboard = deleteDashboard;
		$scope.shareDashboard = shareDashboard;

		init();

		function init() {
			loadDashboards();
		}

		/** 
		 * @name displayView
		 * @desc Open loadingDashboards modal and load dashboards.
		 */
		function displayView(type) {
			return !$scope.loading && ($scope.view === type);
		}

		/** 
		 * @name loadDashboards
		 * @desc Open loadingDashboards modal and load dashboards.
		 */
		function loadDashboards() {
			$modal.open({
			  templateUrl: 'app/dashboards/modals/loadDashboards/loadDashboards.html',
		      controller: 'LoaddashboardsCtrl'
			}).result.then(function(dashboards){
			  $scope.dashboards = dashboards;
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
		 * @name selectAllDashboards
		 * @desc Add or Remove all dashboards from $scope.selectedDashboards.
		 * @params {{Boolean}} selectAll, are we adding or removing dashboards.
		 */
		function selectAllDashboards(selectAll) {
			if(selectAll) {
				$scope.selectedDashboards = angular.copy($scope.dashboards);
			} else {
				$scope.selectedDashboards = [];
			}
		}

		/** 
		 * @name selectDashboard
		 * @desc Check if dashboard is in $scope.selectedDashboards.
		 * @params {{Object}} dashboard, a dashboard object.
		 */
		function selectDashboard(dashboard) {
			if(selected(dashboard)) {
				$scope.selectedDashboards = _.reject($scope.selectedDashboards, function(item) {
					return item._id === dashboard._id;
				});
			} else {
				$scope.selectedDashboards.push(dashboard);
			}
		}

		/** 
		 * @name selected
		 * @desc Check if dashboard is selected, in $scope.selectedDashboards.
		 * @params {{Object}} dashboard, a dashboard object.
		 * @return {{Boolean}} returns undefined if dashboard is not found.
		 */
		function selected(dashboard) {
			return _.findWhere($scope.selectedDashboards, {
				id: dashboard._id
			});
		}

 		/** 
		 * @name editDashboard
		 * @desc Display a sweetalert to confirm dashboards deletion.
		 * On cancel deletion, display a message that the dashboards
		 * are safe and have not been deleted.
		 * On delete, display a message that the dashboards have been deleted.
		 */
		function editDashboard(contentId) {
			$state.go('dashboards.edit', {
				id: contentId
			});
		}

		/** 
		 * @name Delete All Dashboards
		 * @desc Display a sweetalert to confirm dashboards deletion.
		 * On cancel deletion, display a message that the dashboards
		 * are safe and have not been deleted.
		 * On delete, display a message that the dashboards have been deleted.
		 */
		function deleteAllDashboards() {
			var numberOfSelectedDashboards = $scope.selectedDashboards.length;

			if(numberOfSelectedDashboards > 0) {
				SweetAlert.swal({
				   title: 'Are you sure?',
				   text: 'You will not be able to recover these ' + numberOfSelectedDashboards + ' dashboards!',
				   type: "warning",
				   showCancelButton: true,
				   confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete them!",
				   cancelButtonText: "No, cancel please!",
				   closeOnConfirm: false,
				   closeOnCancel: false }, 
				function(isConfirm){ 
				   if (isConfirm) {
				   		Dashboards
			   				.deleteDashboards(getIdArray($scope.selectedDashboards))
			   				.then(success, error);
				   } else {
				      SweetAlert.swal("Cancelled", "Your dashboards are safe :)", "error");
				   }
				});
			}

			function getIdArray(dashboards) {
				var idArray = [];
				angular.forEach(dashboards, function(dashboard) { 
					idArray.push(parseInt(dashboard._id, 10));
		   		});

				return idArray;
			}

			function success(response) {
				// remove dashboards from dashboards array.
		   		angular.forEach($scope.selectedDashboards, function(dashboard) { 
		   			$scope.dashboards = _.reject($scope.dashboards, function(item) {
						return item._id === dashboard._id;
					});
		   		});
		   		// empty selected dashboards array.
		   		$scope.selectedDashboards = [];
				SweetAlert.swal("Deleted!", "Your dashboards have been deleted.", "success");
			}

			function error(response) {
				SweetAlert.swal('Error', 'Server error ' +  response.data.code + ': ' + response.data.message, 'error');
			}
		}

		/** 
		 * @name Delete Dashboard
		 * @desc Display a sweetalert to confirm dashboard deletion.
		 * On cancel deletion, display a message that the dashboard
		 * is safe and has not been deleted.
		 * On delete, display a message that the dashboard has been deleted.
		 * @params {{Object}} dashboard, a dashboard object.
		 */
		function deleteDashboard(dashboard) {
			SweetAlert.swal({
			   title: "Are you sure?",
			   text: "You will not be able to recover this dashboard!",
			   type: "warning",
			   showCancelButton: true,
			   confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
			   cancelButtonText: "No, cancel please!",
			   closeOnConfirm: false,
			   closeOnCancel: false }, 
			function(isConfirm){ 
			   if (isConfirm) {
			   		Dashboards
		   				.deleteDashboards(dashboard._id)
		   				.then(success, error);
			   } else {
			      SweetAlert.swal("Cancelled", "Your dashboard is safe :)", "error");
			   }
			});

			function success(response) {
				// remove dashboard from dashboards array.
		   		$scope.dashboards = _.reject($scope.dashboards, function(item) {
					return item._id === dashboard._id;
				});
				$scope.selectedDashboards = _.reject($scope.selectedDashboards, function(item) {
					return item._id === dashboard._id;
				});
				SweetAlert.swal("Deleted!", "Your dashboard has been deleted.", "success");	
			}

			function error(response) {
				SweetAlert.swal('Error', 'Server error ' +  response.data.code + ': ' + response.data.message, 'error');
			}
		}

		/** 
		 * @name Share Dashboard
		 * @desc Display a modal for user to copy the share url
		 * or iframe for the dashboard selected.
		 * @params {{Number}} dashboardId, the dashboard id. 
		 */
		function shareDashboard(dashboardId) {
			$modal.open({
			  templateUrl: 'app/dashboards/modals/shareDashboards/shareDashboards.html',
		      controller: 'SharedashboardsCtrl',
			  resolve: {
		        dashboardId: function () {
		          return dashboardId;
		        }
		      }
			})
		}

		/** 
		 * @desc Watch for group change and load group dashboards.
		 */
		$scope.$watch(function() {
                return State.dim.group._id
            }, function(newGroup, oldGroup) {
            if(newGroup !== oldGroup) {
                loadDashboards();
            }
        });
	}
})();