angular
	.module('core', [
		'auth0',
		'angular-storage',
		'angular-jwt',
		'ngCookies',
		'ngResource',
		'ngSanitize',
		'ngRoute',
		'ngAnimate',
		'ui.utils',
		'ui.router',
		'ui.bootstrap',
		'ui.select',
		'xeditable',
		'textAngular',
		'autofields',
		'easypiechart',
		'NgSwitchery',
		'sun.scrollable',
		'highcharts-ng',
		'oitozero.ngSweetAlert',
		'truncate',
		'colorpicker.module'
	])
	.constant('nanoScrollerDefaults', {
	    nanoClass: 'scroll-pane',
	    paneClass: 'scroll-track',
	    sliderClass: 'scroll-thumb',
	    contentClass: 'scroll-content'
	 })
	.run(['$window', function ($window) {
		$window.ngGrid.config = {
		    footerRowHeight: 40,
		    headerRowHeight: 40,
		    rowHeight: 40
		};
	}])
	.config(function($stateProvider) {

	});

