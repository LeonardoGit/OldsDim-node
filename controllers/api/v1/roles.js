var RoleModel = require('../../../models/role');


module.exports = function(router) {

    router.post('/api/v1/roles', roleCreate);
    router.get('/api/v1/roles/:groupId', roleGetByGroup);
    router.delete('/api/v1/roles/:groupId', roleDestroyByGroup);
    router.put('/api/v1/roles', roleUpdate);
};

var roleCreate = function(req, res) {

    var role = new RoleModel();
    role.group_id = req.body.groupId;
    role.permission_id = req.body.permissionIds;
    role.name = req.body.roleName;
    role.created_on = new Date();
    role.modified_on = new Date();
    role.core_role = req.body.coreRole;
    role.created_by = "Karlsen Svend";


    RoleModel.find({name: req.body.roleName, group_id: req.body.groupId},function(err, roles) {
        if(roles.length > 0) {
            res.jsonp("repeat-role-name");
        } else {
            role.save(function(err) {
                if (err) {
                    console.log(err);
                } else {
                    res.jsonp("success");
                }
            });
        }
    });


}


var roleGetByGroup = function(req, res) {
    RoleModel.find({group_id : req.params.groupId },function(err, roles) {
        res.send(roles);
    });
}

var roleDestroyByGroup = function(req, res) {
    RoleModel.remove({group_id: req.params.groupId}, function(err, role) {
        if(err) {
            console.log(err);
        } else {
            res.send("success");
        }
    });
}

var roleUpdate = function(req, res) {

    var roleIds = req.body.roleIds;
    var permissionIdArray = req.body.permissionIds;

    roleIds.forEach(function(roleId) {

        RoleModel.find({_id: roleId},function(err, role) {
            var index = roleIds.indexOf(roleId);

            role[0].permission_id = permissionIdArray[index];
            role[0].modified_on = new Date();

            role[0].save();
        });
    });

    res.jsonp("success");
}