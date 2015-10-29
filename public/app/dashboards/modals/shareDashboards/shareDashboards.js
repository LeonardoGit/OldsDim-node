(function(){
'use strict';

angular
	.module('dashboards')
	.controller('SharedashboardsCtrl', SharedashboardsCtrl);

	SharedashboardsCtrl.$inject = ['$scope', '$timeout', 'dashboardId'];

	/**
	 * @name SharedashboardsCtrl
	 * @desc Displays sharing modal for dashboards.
	 * User can copy a url or iframe.
	 * @memberOf dashboards
	 */
	function SharedashboardsCtrl($scope, $timeout, dashboardId) {
		$scope.share = {
			type: 'url',
			value: {
				url: 'http://www.dashboardinaminute.com/dashboards/share/' + dashboardId,
				iframe: '<iframe src="http://www.dashboardinaminute.com/dashboards/share/' + dashboardId +'"></iframe>'
			}
		}

		init();

		function init() {
			initZeroClipboard();
		}
		
		/**
		 * @name initZeroClipboard
		 * @desc Gets button and converts it into
		 * a flash object for copying to clipboard.
		 */
		 function initZeroClipboard() {
		 	$timeout(function() {
				new ZeroClipboard( document.getElementById("copy-share-url") );
			}, 50);
		 }
	}

})();