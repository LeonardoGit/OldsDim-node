(function(){
    'use strict';

    angular
        .module('dim')
        .factory('Invitation', Invitation);

    Invitation.$inject = ['$http'];

    /**
     * @name Invitation
     * @desc API for files
     * @memberOf Dim
     */
    function Invitation($http) {

        Invitation.getAllInvitations = function() {
            return $http.get('/api/v1/invitations')
                .then(function(response) {
                    return response.data;
                });
        };

        Invitation.getInvitationById = function(id) {
            return $http.get('/api/v1/invitations/' + id)
                .then(function(response) {
                    return response.data;
                });
        };

        Invitation.getInvitationsByUserEmail = function(email) {
            return $http.get('/api/v1/invitations/user/' + email)
                .then(function(response) {
                    return response.data;
                });
        };

        Invitation.createInvitation = function(user_email, group_id) {
            var dataObj = {
                user_email: user_email,
                group_id: group_id
            };

            return $http.post('/api/v1/invitations', dataObj)
                .then(function(response) {
                    return response;
                });
        };

        Invitation.updateInvitation = function(invitationId, invitationStatus) {
            var dataObj = {
                invitationId: invitationId,
                invitationStatus: invitationStatus
            };

            return $http.put('/api/v1/invitations', dataObj)
                .then(function(response) {
                    return response;
                });
        };

        Invitation.deleteInvitation = function(id) {
            return $http.delete('/api/v1/invitations/' + id)
                .then(function(response) {
                    return response;
                });
        };

        return Invitation;
    }
})();