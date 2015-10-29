(function() {
'use strict';

angular
	.module('dashboards')
	.controller('DashboardsCreateCtrl', DashboardsCreateCtrl);

	DashboardsCreateCtrl.$inject = ['State', '$scope', '$stateParams', '$modal', '$timeout', 'Dashboards', 'SweetAlert'];

	function DashboardsCreateCtrl(State, $scope, $stateParams, $modal, $timeout, Dashboards, SweetAlert){
		$scope.dashboard = {};
		$scope.dashboardTitle = '';
		$scope.dashboardTiles = [];
		$scope.openTileSettings = openTileSettings;
		$scope.addChart = addChart;
		$scope.addText = addText;
		$scope.addTheme = addTheme;
		$scope.editText = editText;
		$scope.deleteTile = deleteTile;
		$scope.saveDashboard = saveDashboard;

		if ($stateParams.id){
			getDashboard($stateParams.id);
		}

		$scope.gridsterOpts = {
		    columns: 24, // the width of the grid, in columns
		    pushing: true, // whether to push other items out of the way on move or resize
		    floating: true, // whether to automatically float items up so they stack (you can temporarily disable if you are adding unsorted items with ng-repeat)
		    swapping: false, // whether or not to have items of the same size switch places instead of pushing down if they are the same size
		    width: 'auto', // can be an integer or 'auto'. 'auto' scales gridster to be the full width of its containing element
		    colWidth: 'auto', // can be an integer or 'auto'.  'auto' uses the pixel width of the element divided by 'columns'
		    rowHeight: 'match', // can be an integer or 'match'.  Match uses the colWidth, giving you square widgets.
		    margins: [10, 10], // the pixel distance between each widget
		    outerMargin: true, // whether margins apply to outer edges of the grid
		    isMobile: false, // stacks the grid items if true
		    mobileBreakPoint: 600, // if the screen is not wider that this, remove the grid layout and stack the items
		    mobileModeEnabled: true, // whether or not to toggle mobile mode when screen width is less than mobileBreakPoint
		    minColumns: 1, // the minimum columns the grid must have
		    minRows: 2, // the minimum height of the grid, in rows
		    maxRows: 100,
		    defaultSizeX: 2, // the default width of a gridster item, if not specifed
		    defaultSizeY: 1, // the default height of a gridster item, if not specified
		    minSizeX: 1, // minimum column width of an item
		    maxSizeX: null, // maximum column width of an item
		    minSizeY: 1, // minumum row height of an item
		    maxSizeY: null, // maximum row height of an item
		    resizable: {
		       enabled: true,
		       handles: ['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw'],
		       start: function(event, $element, widget) {
		       		$scope.$broadcast('highchartsng.reflow');
		       }, // optional callback fired when resize is started,
		       resize: function(event, $element, widget) {
		       		$scope.$broadcast('highchartsng.reflow');
		       }, // optional callback fired when item is resized,
		       stop: function(event, $element, widget) {
		    		$timeout(function() {
		    			$scope.$broadcast('highchartsng.reflow')
		    		}, 300);
		       } // optional callback fired when item is finished resizing
		    },
		    draggable: {
		       enabled: true, // whether dragging items is supported
		       handle: '.my-class', // optional selector for resize handle
		       start: function(event, $element, widget) {}, // optional callback fired when drag is started,
		       drag: function(event, $element, widget) {}, // optional callback fired when item is moved,
		       stop: function(event, $element, widget) {} // optional callback fired when item is finished dragging
		    }
		};

		$scope.$watch(function() {
			var gridster = angular.element('.gridster');
			return gridster.width();
		}, function(tiles){
			$timeout(function() {
    			$scope.$broadcast('highchartsng.reflow')
    		}, 300);
		}, true);

		function openTileSettings(tile) {
			$modal.open({
				templateUrl: 'app/dashboards/modals/tileSettings/tileSettings.html',
				controller: 'TilesettingsCtrl',
				resolve: {
					tile: function () {
						return tile;
					}
				}
			}).result.then(function(updatedTile){
			  tile = updatedTile;
			});
		}

		function deleteTile(tile) {
			$scope.dashboardTiles.splice($scope.dashboardTiles.indexOf(tile), 1);
		}

		function addChart() {
            $modal.open({
                templateUrl: 'app/dashboards/modals/chartSettings/chartSettings.html',
                controller: 'ChartSettingsCtrl',
                windowClass: 'chart-setting-window'
            }).result.then(function(selectedChart){
                    $scope.dashboardTiles.push(selectedChart);
            });
		}

		function addText() {
			$modal.open({
			  templateUrl: 'app/dashboards/modals/textEditor/textEditor.html',
			  controller: 'TexteditorCtrl',
			  resolve: {
		        tile: function () {
		          return {};
		        }
		      }
			}).result.then(function(text){
			  $scope.dashboardTiles.push({ sizeX: 8, sizeY: 2, text: text, style: { 'color': '', 'background-color': '', 'background-image': ''} });
			});
		}

        function addTheme() {
            $modal.open({
                templateUrl: 'app/dashboards/modals/themeSettings/themeSettings.html',
                controller: 'ThemeSettingsCtrl',
                windowClass: 'theme-setting-window'
            }).result.then(function(){

            });
        }

		function editText(tile) {
			$modal.open({
			  templateUrl: 'app/dashboards/modals/textEditor/textEditor.html',
			  controller: 'TexteditorCtrl',
			  resolve: {
		        tile: function () {
		          return tile;
		        }
		      }
			}).result.then(function(text){
				tile.text = text;
			});
		}

		function getDashboard(id) {
	   		Dashboards
   				.getDashboard(id)
   				.then(success, error);

			function success(dashboard) {
				$scope.dashboard = dashboard;
				$scope.dashboardTiles = $scope.dashboard.data.tiles;
			}

			function error(response) {
				// getDashboard error
			}
		}

		function saveDashboard() {
			var newDashboard = {
				group_id: State.dim.group._id,
				title: $scope.dashboardTitle,
				chart_ids: [1,2,3],
				data: {
					tiles: $scope.dashboardTiles
				},
				modified_by: State.dim.user(),
				created_by: State.dim.user()
			};


	   		Dashboards
   				.saveDashboard(newDashboard)
   				.then(success, error);

			function success(response) {
				SweetAlert.swal("Saved!", "Your dashboard has been saved.", "success");	
			}

			function error(response) {
				SweetAlert.swal('Error', 'Server error ' +  response.data.code + ': ' + response.data.message, 'error');
			}
		}
	}

})();