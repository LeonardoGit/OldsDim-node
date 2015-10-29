angular
    .module('members', ['ui.bootstrap','ui.utils','ui.router','ngAnimate'])
    .config(function($stateProvider) {
        /* Add New States Above */
        $stateProvider.state('members', {
            url: '/members',
            template: '<div ui-view></div>',
            abstract: true,
            data: { requiresLogin: true }
        });
        $stateProvider.state('members.list', {
            url: '/list',
            templateUrl: 'app/members/partial/members.list/members.list.html',
            data: { requiresLogin: true }
        });

    });

