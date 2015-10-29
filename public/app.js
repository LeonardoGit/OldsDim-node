(function() {
'use strict';

angular
    .module('dim', ['core', 'charts', 'dashboards', 'home', 'account', 'files', 'members', 'settings', 'login'])
    .constant('nanoScrollerDefaults', {
      nanoClass: 'scroll-pane',
      paneClass: 'scroll-track',
      sliderClass: 'scroll-thumb',
      contentClass: 'scroll-content'
    })
    .constant('CONFIG', {
      'google': {
        'font': {
          'URL': 'https://www.googleapis.com/webfonts/v1/webfonts',
          'DEVELOPER_KEY': 'AIzaSyBhTcXqjtSzdY8Lk8V93woKdSgY7qls4Fs'
        }
      },
      'auth0': {
        'domain': 'hearst.auth0.com',
        'client_id': '1xs6kSWXALOqdTteUz1awLT8L4k8mjeE'
      },
      'hearst': {
        'api': {
          'url': 'http://api.hearst.io/v1/',
          'developer_token': '6%7Cgeneric%7C3a2e8954befdbd6e7eac2f10d4301a2923cd65a5f38bf80914019b55a03f78c4',
          'shared_token': '14048|ca2a3454966ab245418b8bdc2a77825c|e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
        }
      },
      'aws': {
        'account': {
          'accessKeyId': 'AKIAJVKY66LSKTC4YTRQ',
          'secretAccessKey': '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',
          'region': 'us-west-2'
        },
        'files': {
          'bucket': 'www.dashboardinaminute.com',
          'path': '/files/csv/',
          'meta': [],
          'key': '14021',
          'public': true,
          'persist_source': true
        },
        'thumbnails': {
          'bucket': 'www.dashboardinaminute.com',
          'path': '/files/thumbnails/',
          'meta': [],
          'key': '14021',
          'public': true,
          'persist_source': true
        },
        'backgrounds': {
          'bucket': 'www.dashboardinaminute.com',
          'path': '/files/backgrounds/',
          'meta': [],
          'key': '14021',
          'public': true,
          'persist_source': true
        }
      },
    })
    .config(function($stateProvider, $urlRouterProvider, $httpProvider, authProvider, jwtInterceptorProvider, CONFIG) {
        /* Add New States Above */
        $urlRouterProvider.otherwise('/');

        /**
         *  initialize auth0
         * @True {[type]}
         */
        authProvider.init({
          domain: CONFIG.auth0.domain,
          clientID: CONFIG.auth0.client_id,
          loginState: 'home'
        });

        /**
         * Configure JWT settings
         * @True {Array}
         */
        // We're annotating this function so that the `store` is injected correctly when this file is minified
        jwtInterceptorProvider.tokenGetter = ['store', function(store) {
          // Return the saved token
          return store.get('token');
        }];

        $httpProvider.interceptors.push('jwtInterceptor');
    })
    .run(function($rootScope, $state, $window, auth, store, jwtHelper) {
        // This hooks al auth events to check everything as soon as the app starts
        auth.hookEvents();

        // This events gets triggered on refresh or URL change
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
          var token = store.get('token');
          if (token) {
            if (!jwtHelper.isTokenExpired(token)) {
              if (!auth.isAuthenticated) {
                auth.authenticate(store.get('profile'), token);
              }
            } else if(toState.name !== 'home') {
              // Either show Login page or use the refresh token to get a new idToken
              $state.go('home');
            }
          } else if(toState.name !== 'home') {
              // Either show Login page or use the refresh token to get a new idToken
              $state.go('home');
          }
        });

        $window.ngGrid.config = {
        footerRowHeight: 40,
        headerRowHeight: 40,
        rowHeight: 40
    };

        $rootScope.safeApply = function(fn) {
            var phase = $rootScope.$$phase;
            if (phase === '$apply' || phase === '$digest') {
                if (fn && (typeof(fn) === 'function')) {
                    fn();
                }
            } else {
                this.$apply(fn);
            }
        };
    });
})();