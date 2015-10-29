var PermissionModel = require('../../../models/permission');


module.exports = function(router) {
    router.get('/api/v1/permissions', permissionsGet);
};


var permissionsGet = function(req, res) {
    PermissionModel.find({},function(err, permissions) {
        res.send(permissions);
    });
}
