(function() {
    'use strict';

    angular
        .module('dim')
        .controller('GroupCtrl', GroupCtrl);

    GroupCtrl.$ingject = ['$scope', '$state', 'auth', 'store', 'HearstAPI','$modal','User','$modalInstance','Group'];

    function GroupCtrl($scope, $state, auth, store, HearstAPI, $modal, User, Group, $modalInstance){
        $scope.save = save;
        $scope.close = close;
        $scope.savedGroup = {};

        function save() {

            Group.getPermissionIds()
                .then(successGetPermissions, error);

            function successGetPermissions(response) {
                Group.save($scope.newGroup)
                    .then(success, error);
            }

            function success(response) {
                if(response.data.name) {
                    $scope.saveSuccess = true;
                    $scope.message = "New group saved successfully!";
                    $scope.savedGroup = response.data;
                } else if(response.data.errorCode == 201) {
                    $scope.message = response.data.errorMessage;
                }
            }


            function error(response) {

            }
        };

        $scope.close = function() {
            $modalInstance.close($scope.savedGroup);
        };
    }
})();