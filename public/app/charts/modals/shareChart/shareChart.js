(function(){
'use strict';

angular
	.module('charts')
	.controller('SharechartCtrl', SharechartCtrl);

	SharechartCtrl.$inject = ['$scope', '$timeout', 'chartId'];

	/**
	 * @name SharechartCtrl
	 * @desc Displays sharing modal for charts.
	 * User can copy a url or iframe.
	 * @memberOf charts
	 */
	function SharechartCtrl($scope, $timeout, chartId) {
		$scope.share = {
			type: 'url',
			value: {
				url: 'http://www.dashboardinaminute.com/charts/share/' + chartId,
				iframe: '<iframe src="http://www.dashboardinaminute.com/charts/share/' + chartId +'"></iframe>'
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