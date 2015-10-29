angular.module('settings', ['ui.bootstrap','ui.utils','ui.router','ngAnimate', 'flow']);

angular.module('settings').config(function($stateProvider) {

    /* Add New States Above */
    $stateProvider.state('settings', {
        url: '/settings',
        template: '<div ui-view></div>',
        abstract: true,
        data: { requiresLogin: true }
    });
    $stateProvider.state('settings.config', {
        url: '',
        templateUrl: 'app/settings/partial/settings.config/settings.config.html',
        data: { requiresLogin: true }
    });

});

