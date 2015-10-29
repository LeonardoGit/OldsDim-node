(function() {
    'use strict';

    angular
        .module('members')
        .controller('AddMemberCtrl', AddMemberCtrl);

    AddMemberCtrl.$ingject = ['$scope', '$modalInstance', 'State', 'Group', 'Invitation'];

    function AddMemberCtrl($scope, $modalInstance, State, Group, Invitation){
        $scope.newMember = {
            user_id: State.dim.user['_id'],
            first_name: '',
            last_name: '',
            email: '',
            role: 'user'
        };
        $scope.saveSuccess = false;
        $scope.saveError = false;
        $scope.group = State.dim.group;

        $scope.close = function() {
            $modalInstance.close($scope.group);
        };

        $scope.save = function() {
            $scope.group.members.push($scope.newMember);

            Group
                .update($scope.group._id, $scope.group)
                .then(success, error);

            function success(response) {
                $scope.group = response.data;
                $scope.saveSuccess = true;
                $scope.message = "The new member has been added successfully!";

                Invitation
                    .createInvitation($scope.newMember.email, $scope.group._id)
                    .then(success, error);

                function success(response) {
                }

                function error(response) {
                    $scope.saveError = true;
                    $scope.message = 'Server error!';
                }
            }

            function error(response) {
                $scope.saveError = true;
                $scope.message = 'Server error!';
            }
        };
    }
})();