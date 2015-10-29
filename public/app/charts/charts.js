angular
	.module('charts', ['ui.bootstrap','ui.utils','ui.router','ngAnimate'])
	.config(function($stateProvider) {

        $stateProvider.state('charts', {
            url: '/charts',
            template: '<div ui-view></div>',
            abstract: true,
            data: { requiresLogin: true } 
        });
        $stateProvider.state('charts.list', {
            url: '',
            templateUrl: 'app/charts/partial/charts.list/charts.list.html',
            data: { requiresLogin: true }
        });
        $stateProvider.state('charts.create', {
            url: '/create',
            templateUrl: 'app/charts/partial/charts.create/charts.create.html',
            data: { requiresLogin: true }
        });
        $stateProvider.state('charts.share', {
            url: '/share',
            templateUrl: 'app/charts/partial/charts.share/charts.share.html',
            data: { requiresLogin: false }
        });
    	/* Add New States Above */
	});

