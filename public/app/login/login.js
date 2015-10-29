angular.module('login', ['ui.bootstrap','ui.utils','ui.router','ngAnimate']);

angular.module('login').config(function($stateProvider) {

    /* Add New States Above */
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'app/login/partial/login/login.html',
        data: { requiresLogin: true }
    });

});

