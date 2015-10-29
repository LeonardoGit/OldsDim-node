angular
	.module('dashboards', ['ui.bootstrap','ui.utils','ui.router','ngAnimate', 'gridster'])
	.config(function($stateProvider) {

		$stateProvider.state('dashboards', {
            url: '/dashboards',
            template: '<div ui-view></div>',
            abstract: true
        });
        $stateProvider.state('dashboards.list', {
            url: '',
            templateUrl: 'app/dashboards/partial/dashboards.list/dashboards.list.html',
            data: { requiresLogin: true }
        });
        $stateProvider.state('dashboards.create', {
            url: '/create',
            templateUrl: 'app/dashboards/partial/dashboards.create/dashboards.create.html',
            data: { requiresLogin: true }
        });
        $stateProvider.state('dashboards.edit', {
            url: '/create/:id',
            templateUrl: 'app/dashboards/partial/dashboards.create/dashboards.create.html',
            data: { requiresLogin: true }
        });
        $stateProvider.state('dashboards.share', {
            url: '/share',
            templateUrl: 'app/dashboards/partial/dashboards.share/dashboards.share.html',
            data: { requiresLogin: false }
        });
    	/* Add New States Above */

});

