(function(){
'use strict';

angular
    .module('members')
    .controller('MembersListCtrl', MembersListCtrl);

    MembersListCtrl.$inject = ['State', '$scope', '$filter', '$modal', 'SweetAlert', 'Group'];

    /**
     * @name MembersListCtrl
     * @desc List members in list
     * @memberOf members
     */
    function MembersListCtrl(State, $scope, $filter, $modal, SweetAlert, Group) {
        $scope.loading = true;
        $scope.members = [];
        $scope.addMember = addMember;
        $scope.updateMember = updateMember;
        $scope.deleteMember = deleteMember;
        $scope.group = State.dim.group;

        $scope.roles = [
            {
                id: 'admin',
                text: 'admin'
            }, {
                id: 'user',
                text: 'user'
            }
        ];

        init();

        function init() {
            loadMembers();
        }

        /**
         * @name loadMembers
         * @desc Open loadingMembers modal and load members.
         */
        function loadMembers() {
            $modal.open({
                templateUrl: 'app/members/modals/loadMembers/loadMembers.html',
                controller: 'LoadMembersCtrl'
            }).result.then(function(group){
                $scope.loading = false;
            });
        }

        /**
         * @name addMember
         * @desc Open addMember modal.
         */
        function addMember() {
            $modal.open({
                templateUrl: 'app/members/modals/addMember/addMember.html',
                controller: 'AddMemberCtrl'
            }).result.then(function(group) {
                $scope.group = group;
            });
        }

        /**
         * @name updateMember
         * @desc Update member
         * @params {{string}} data, updated member data.
         * @params {{string}} memberId, updated member id.
         */
        function updateMember(data, memberId) {

            angular.extend(data, {
                id: memberId
            });

            _.each($scope.group.members, function(member) {
                if(member.user_id === memberId) {
                    member = data;
                    Group
                        .update($scope.group._id, $scope.group)
                        .then(success, error);
                }
            });
            function success(response) {
                SweetAlert.swal("Updated!", "The member has been updated.", "success");
            }

            function error(response) {
                SweetAlert.swal('Error', 'Server error ' +  response.data.code + ': ' + response.data.message, 'error');
            }
        }

        /**
         * @name Delete Member
         * @desc Display a sweetalert to confirm member deletion.
         * On cancel deletion, display a message that the member
         * is safe and has not been deleted.
         * On delete, display a message that the member has been deleted.
         * @params {{string}} memberId, a member id.
         */
        function deleteMember(memberId) {
            SweetAlert.swal({
                title: 'Are you sure?',
                text: 'You will not be able to recover these member!',
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete them!",
                cancelButtonText: "No, cancel please!",
                closeOnConfirm: false,
                closeOnCancel: false
            }, function(isConfirm) {
                if (isConfirm) {
                    $scope.group.members = _.reject($scope.group.members, function(item) {
                        return item.user_id === memberId;
                    });
                    Group
                        .update($scope.group._id, $scope.group)
                        .then(success, error);
                } else {
                    SweetAlert.swal("Cancelled", "Your members are safe :)", "error");
                }
            });

            function success(response) {
                // remove member from members.
                SweetAlert.swal("Deleted!", "This member has been deleted.", "success");
            }

            function error(response) {
                SweetAlert.swal('Error', 'Server error ' +  response.data.code + ': ' + response.data.message, 'error');
            }
        }

        $scope.showRole = function(member) {
            if (member.role && $scope.roles.length) {
                var selected = $filter('filter')($scope.roles, {
                    id: member.role
                });
                return selected.length ? selected[0].text : 'Not set';
            } else {
                return member.role || 2;
            }
        };


        $scope.$watch(function() {
                return $scope.group._id
            }, function(newGroup, oldGroup) {
            if(newGroup !== oldGroup) {
                loadMembers();
            }
        });



        /*
        $scope.members = [{
            id: 1,
            name: 'Tara Jackson',
            email: 'tarajackson59@gmamil.com',
            role: 1
        }, {
            id: 2,
            name: 'John Smith',
            email: 'johnsmith@yahoo.com',
            role: 2
        }, {
            id: 3,
            name: 'Randy Williams',
            email: 'randywilliams@gmail.com',
            role: 2
        }];
        */

    }
})();