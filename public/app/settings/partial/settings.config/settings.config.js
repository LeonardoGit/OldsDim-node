angular.module('settings').controller('SettingsConfigCtrl',['State', '$scope', '$http', '$theme', 'Setting', '$modal', 'SweetAlert', function(State, $scope, $http, $theme, Setting, $modal, SweetAlert){

    var table_headers;
    var table_rows = [];
    var default_d_theme = '';
    var default_c_theme = '';
    var default_t_theme = '';


    $scope.currentRole = 'admin';
    $scope.group = State.dim.group;
    $scope.roles = [];
    $scope.themes = [];
    $scope.groupData = [];
    $scope.dashboardThemes = [];
    $scope.chartThemes = [];
    $scope.tableThemes = [];

    $scope.setTableData = function() {
        $scope.data = {
            headings: table_headers, rows: table_rows
        };
    };

    $scope.changePermission = function($permissionId, $roleId, $permissionName) {

        var selectedPermission;

        $scope.roles.forEach(function(role) {
            if (role._id != $roleId) return;


            role.permission_id.forEach(function(permission) {
                if (permission.name != $permissionName) return;

                var index = permission.value.indexOf($permissionId);

                if (index >= 0) {
                    permission.value.splice(index, 1);
                }else {
                    permission.value.push($permissionId);
                }

                selectedPermission = permission;
            });
        });

        table_rows.forEach(function (row) {
            if (row.roleId != $roleId) return;
            if (row.permissionName != $permissionName) return;

            var permissionValue = [];
            table_headers.forEach(function (permission) {
                if (selectedPermission.value.indexOf(permission._id) >= 0) {
                    permissionValue.push({permissionId: permission._id, value: 1});
                } else {
                    permissionValue.push({permissionId: permission._id, value: 0});
                }
            });

            row.permissionValues = permissionValue;
        });

        console.log(table_rows);
    };

    $scope.submitPermissionForm = function() {

        $scope.setSettingInfo();

        $modal.open({
            templateUrl: 'app/settings/modals/settingsSavePermissionModal/settingsSavePermissionModal.html',
            controller: 'SettinsSavePermissionModalCtrl'
        }).result.then(function(response){
            $scope.loading = false;
        });
    };

    $scope.deleteGroup = function() {
        $scope.setSettingInfo();
        $modal.open({
            templateUrl: 'app/settings/modals/settingsDeleteGroupModal/settingsDeleteGroupModal.html',
            controller: 'SettingsDeleteGroupModalCtrl'
        }).result.then(function(response){
            $scope.loading = false;
        });
    };

    $scope.createRole = function() {
        $scope.setSettingInfo();
        $modal.open({
            templateUrl: 'app/settings/modals/settingsCreateRoleModal/settingsCreateRoleModal.html',
            controller: 'SettingsCreateRoleModalCtrl'
        }).result.then(function(response){
            $scope.loading = false;
        });
    }

    $scope.setSettingInfo = function() {
        var roleIds = [];
        var permissionIds = [];

        $scope.roles.forEach(function(role) {
            roleIds.push(role._id);
            permissionIds.push(role.permission_id);
        });

        Setting.setSettingInfo({roleIds: roleIds, permissionIds: permissionIds, groupId: $scope.group['_id'], groupData: $scope.groupData});
    }

    $scope.submitThemeForm = function() {
        $scope.groupData.data.defaultThemes.dashboard = $scope.dashboardTheme;
        $scope.groupData.data.defaultThemes.chart = $scope.chartTheme;
        $scope.groupData.data.defaultThemes.table = $scope.tableTheme;

        console.log($scope.groupData);

        $scope.setSettingInfo();

        $modal.open({
            templateUrl: 'app/settings/modals/settingsSaveThemeModal/settingsSaveThemeModal.html',
            controller: 'SettingsSaveThemeModalCtrl'
        }).result.then(function(response){
            $scope.loading = false;
        });
    }

    reloadPermissionTable();
    reloadGroupData();

    function reloadThemes() {
        //get Themes By Group Id
        Setting.getThemes($scope.group['_id']).then(successGetThemes, error);
    }

    function reloadGroupData() {
        //get Themes By Group Id
        Setting.getGroupData($scope.group['_id']).then(successGetGroup, error);
    }

    function reloadPermissionTable() {
        //get Permission List
        Setting.getPermissions().then(successGetPermissions, error);
    }

    //Callback Functions
    function successGetPermissions(response) {
        table_headers = response.data;

        //get Roles
        Setting.getRoles($scope.group['_id']).then(successGetRoles, error);
    }

    function successGetThemes(response) {
        $scope.themes = response.data;
        $scope.dashboardThemes = [];
        $scope.chartThemes = [];
        $scope.tableThemes = [];

        $scope.themes.forEach(function(theme) {
            if (theme.type == 'all' || theme.type == 'dashboard') {
                if (theme.name == 'Default') default_d_theme = theme._id;
                $scope.dashboardThemes.push(theme);
            }
            if (theme.type == 'all' || theme.type == 'chart') {
                if (theme.name == 'Default') default_c_theme = theme._id;
                $scope.chartThemes.push(theme);
            }
            if (theme.type == 'all' || theme.type == 'table') {
                if (theme.name == 'Default') default_t_theme = theme._id;
                $scope.tableThemes.push(theme);
            }
        });

        $scope.dashboardTheme = $scope.groupData.data.defaultThemes.dashboard;
        $scope.chartTheme = $scope.groupData.data.defaultThemes.chart;
        $scope.tableTheme = $scope.groupData.data.defaultThemes.table;

        console.log($scope.dashboardTheme);

        if ($scope.dashboardTheme == '') $scope.dashboardTheme = default_d_theme;
        if ($scope.chartTheme == '') $scope.chartTheme = default_c_theme;
        if ($scope.tableTheme == '') $scope.tableTheme = default_t_theme;
    }

    function successGetGroup(response) {
        $scope.groupData = response.data;

        reloadThemes();
    }


    function successGetRoles(response) {
        $scope.roles = response.data;

        $scope.roles.forEach(function(role) {

            role.permission_id.forEach(function(permission) {
                var permissionValue = [];
                table_headers.forEach(function(item) {
                    if (permission.value.indexOf(item._id) >= 0) {
                        permissionValue.push({permissionId: item._id, value: 1});
                    }else {
                        permissionValue.push({permissionId: item._id, value: 0});
                    }
                });

                table_rows.push({roleId:role._id, permissionName: permission.name, roleName:role.name,  permissionValues: permissionValue});
            });
        });

        $scope.setTableData();
    }

    function successUpdateRoles(response) {
        console.log(response.data);
    }

    function error() {

    }

}]);