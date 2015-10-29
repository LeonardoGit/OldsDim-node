angular
	.module('account', ['ui.bootstrap','ui.utils','ui.router','ngAnimate'])
	.config(function($stateProvider) {

		$stateProvider.state('account', {
            url: '/account',
            template: '<div ui-view></div>',
            abstract: true,
            data: { requiresLogin: true }
        });
        $stateProvider.state('account.profile', {
            url: '/profile',
            templateUrl: 'app/account/partial/account.profile/account.profile.html',
            data: { requiresLogin: true }
        });

    /* Add New States Above */

});

