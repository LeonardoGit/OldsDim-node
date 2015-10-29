angular
	.module('home', ['ui.bootstrap','ui.utils','ui.router','ngAnimate'])
	.config(function($stateProvider) {
		$stateProvider.state('home', {
			url: '/',
			templateUrl: 'app/home/partial/home/home.html'
		});
	    /* Add New States Above */
});

