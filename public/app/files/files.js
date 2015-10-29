angular
	.module('files', ['ui.bootstrap','ui.utils','ui.router','ngAnimate'])
	.config(function($stateProvider) {
	 	$stateProvider.state('files', {
	        url: '/files',
	        template: '<div ui-view></div>',
	        abstract: true,
	        data: { requiresLogin: true }
	    });
	    $stateProvider.state('files.list', {
	        url: '',
	        templateUrl: 'app/files/partial/files.list/files.list.html',
	        data: { requiresLogin: true }
	    });
	    /* Add New States Above */

});

