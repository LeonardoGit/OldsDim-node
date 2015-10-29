(function(){
    'use strict';

    angular
        .module('settings')
        .factory('Setting', Setting);

    Setting.$inject = ['State', '$http'];

    /**
     * @name Files
     * @desc API for files
     * @memberOf files
     */
    function Setting(State, $http) {
        var settingInfo = {};

        Setting.getPermissions = function() {
            return $http.get('/api/v1/permissions')
                .then(function(response) {
                    return response;
                });
        };

        Setting.getThemes = function(groupId) {
            console.log(groupId);
            return $http.get('/api/v1/themes/group/' + groupId)
                .then(function(response) {
                    return response;
                });
        }

        Setting.createRole = function(groupId, roleName, coreRole, permissionIds) {
            var dataObj = { groupId: groupId, roleName: roleName, coreRole: coreRole , permissionIds: permissionIds};
            return $http.post('/api/v1/roles',dataObj)
                .then(function(response) {
                    return response;
                });
        }

        Setting.getRoles = function(groupId) {
            return $http.get('/api/v1/roles/'+ groupId)
                .then(function(response) {
                    return response;
                });
        };

        Setting.updateRoles = function(roleIds, permissionIds) {
            var dataObj = { roleIds : roleIds, permissionIds: permissionIds};
            return $http.put('/api/v1/roles',dataObj)
                .then(function(response) {
                    return response;
                });
        };


        Setting.getGroupData = function(groupId) {
            return $http.get('/api/v1/groups/'+ groupId)
                .then(function(response) {
                    console.log(response);
                    return response;
                });
        };

        Setting.updateGroupData = function(groupId, groupData) {
            var dataObj = { groupId : groupId, groupBody: groupData};
            return $http.put('/api/v1/groups',dataObj)
                .then(function(response) {
                    return response;
                });
        }

        Setting.deleteGroup = function(groupId) {
            return $http.delete('/api/v1/groups/'+ groupId)
                .then(function(response) {
                    var index;
                    _.find(State.dim.groups, function(group, i){ 
                       if(group['_id'] == groupId){ index = i; return true;}; 
                    });

                    State.dim.groups.splice(index, 1);
                    $.extend( State.dim.group, State.dim.groups[0] );

                    return response;
                });
        };


        Setting.setSettingInfo = function ( arrRole ) {
            settingInfo = {
                roleIds: arrRole.roleIds,
                permissionIds: arrRole.permissionIds,
                groupId: arrRole.groupId,
                groupData: arrRole.groupData
            };
        };

        Setting.getSettingInfo = function() {
            return settingInfo;
        };

        return Setting;
    }
})();