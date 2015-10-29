(function() {
'use strict';

angular
	.module('dim')
	.controller('HeaderCtrl', HeaderCtrl);

	HeaderCtrl.$ingject = ['State', '$scope', '$state', 'auth', 'store', 'HearstAPI','$modal','User', 'Users', 'Group'];

	function HeaderCtrl(State, $scope, $state, auth, store, HearstAPI, $modal, User, Users, Group){
		$scope.auth = auth;
		$scope.selectedGroup = State.dim.group;
		$scope.selectGroup = selectGroup;
		$scope.userGroups = State.dim.groups;
		$scope.login = login;
		$scope.logout = logout;
		$scope.createGroup = createGroup;

		init();

		function init() {
			if(auth.isAuthenticated) {
				var user = State.dim.user();
				if(user) {
                    State.user = user;
					getUserGroups(user['_id']);
				}
			}
		}

		function login() {
			auth.signin({
				connections: ['amazon'],
			}, function (profile, token) {
				// Success callback
				store.set('profile', profile);
				store.set('token', token);
				getUserSession();
			}, function () {
				// Error callback
			});
		};

		function logout() {
			auth.signout();
			store.remove('dim.user');
			store.remove('profile');
			store.remove('token');
			$state.go('home');
		};

		function selectGroup(group) {
			$.extend( State.dim.group, group );
		}

		function getUserGroups(id) {
			Group.getGroupsByUserId(id).then(function(groups) {
				State.dim.groups.push.apply( State.dim.groups, groups );
				selectGroup( groups[0] );
			});
		}

        function createGroup() {
            $modal.open({
                templateUrl: 'app/group/modals/createGroup.html',
                controller: 'GroupCtrl'
            }).result.then(function(group){
            	selectGroup( group );
            	State.dim.groups.push(group);
            });
        }

		function getUserSession() {
			HearstAPI
				.sessionUser()
				.then(success, error);

			function success(profile) {
				// remove chart from charts array.
				Users.getUserByUsername('kraken').then(function(user) {
					store.set('dim.user', user);

					User.profile = profile;					
					store.set('user.profile', profile);

					var user = State.dim.user();
					getUserGroups(user['_id']);

			   		$state.go('dashboards.list');
				});
			}

			function error(response) {
				// error for session user
			}
		}

	}
})();