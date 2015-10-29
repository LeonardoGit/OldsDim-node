(function() {
'use strict';

angular
    .module('account')
    .controller('AccountProfileCtrl', AccountProfileCtrl);

    AccountProfileCtrl.$ingject = ['$scope', '$window', 'auth', 'SweetAlert'];

    function AccountProfileCtrl($scope, $window, auth, SweetAlert) {
        $scope.auth = auth;
        $scope.deleteAccount = deleteAccount;

        function deleteAccount() {
            SweetAlert.swal({
                title: 'Are you sure?',
                text: 'You will not be able to recover these account!',
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete them!",
                cancelButtonText: "No, cancel please!",
                closeOnConfirm: false,
                closeOnCancel: false
            }, function(isConfirm) {
                if (isConfirm) {
                    $window.location.href = '/';
                } else {
                    SweetAlert.swal("Cancelled", "Your members are safe :)", "error");
                }
            });
        }
    }
})();