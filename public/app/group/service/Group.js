(function(){
    'use strict';

    angular
        .module('files')
        .factory('Group', Group);

    Group.$inject = ['$http', 'State'];

    /**
     * @name Files
     * @desc API for files
     * @memberOf files
     */
    function Group($http, State) {
        var user = State.dim.user();
        var permissionIds = [];
        var viewId = 0;
        var editId = 0;

        Group.getPermissionIds = function() {
            return $http.get('/api/v1/permissions')
                .then(function(response) {
                    var permissions = response.data;
                    var index = 0;

                    permissionIds = [];

                    permissions.forEach(function (permission) {
                        permissionIds.push(permission._id);
                        if (permission.name == 'view') viewId = index;
                        if (permission.name == 'edit') editId = index;
                        index++;
                    });

                    return response;
                });
        };

        Group.save = function(name) {
            var groupObj = {
                name: name,
                members: [{
                    user_id: user['_id'],
                    first_name: 'Kraken',
                    last_name: 'McSquid',
                    email: 'kraken.McSquid@gmail.com',
                    role: 'admin'
                }],
                data: {
                    roles: [
                        {
                            name: 'admin',
                            core_role: false,
                            permission_id: [
                                {name: 'Dashboard', value: permissionIds},
                                {name: 'Charts', value: permissionIds},
                                {name: 'Files', value: permissionIds},
                                {name: 'Themes', value: permissionIds},
                                {name: 'Members', value: permissionIds},
                                {name: 'Settings', value: [permissionIds[viewId], permissionIds[editId]]}
                            ]
                        },
                        {
                            name: 'user',
                            core_role: false,
                            permission_id: [
                                {name: 'Dashboard', value: permissionIds},
                                {name: 'Charts', value: permissionIds},
                                {name: 'Files', value: permissionIds},
                                {name: 'Themes', value: permissionIds},
                                {name: 'Members', value: []},
                                {name: 'Settings', value: []}
                            ]
                        }
                    ],
                    defaultThemes: {
                        chart:'',
                        dashboard:'',
                        table:''
                    }
                },
                created_by: user['_id']
            };

            return $http.post('/api/v1/groups', groupObj)
                .then(function(response) {
                    return response;
                });
        };

        Group.getGroupsByUserId = function(id) {
            return $http.get('/api/v1/groups/user/' + id)
                .then(function(response) {
                    return response.data;
                });
        };

        Group.del = function(groupId) {
            return $http.delete('/api/v1/groups/'+ groupId)
                .then(function(response) {
                    return response;
                });
        };

        Group.update = function(groupId, groupBody) {
            var dataObj = { groupId : groupId, groupBody: groupBody};
            return $http.put('/api/v1/groups',dataObj)
                .then(function(response) {
                    return response;
                });
        };

        return Group;
    }
})();