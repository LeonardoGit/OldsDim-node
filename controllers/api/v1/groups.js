var GroupModel = require('../../../models/group');
var RoleModel = require('../../../models/role');
var PermissionModel = require('../../../models/permission');

module.exports = function(router) {
    router.get('/api/v1/groups', getAllGroups);
    router.post('/api/v1/groups', createGroup);
    router.get('/api/v1/groups/:groupId', getGroupById);
    router.get('/api/v1/groups/user/:userId', getGroupByUserId);
    router.delete('/api/v1/groups/:groupId', deleteGroupById);
    router.put('/api/v1/groups', groupUpdate);
};

var getAllGroups = function(req, res) {
    GroupModel.find(function(err, groups) {
        res.send(groups);
    });
};

var createGroup = function(req, res) {
    req.body.created_on = new Date();
    req.body.modified_on = new Date();

    var group = new GroupModel(req.body);

    GroupModel.find({name: req.body.name},function(err, groups) {
        if(groups.length > 0) {
            res.send({
                errorCode: 201,
                errorMessage: 'You already have a group with this name.'
            });
        } else {
            group.save(function(err, newGroup) {
                if (err) {
                    console.log(err);
                } else {
                    newGroup.data.roles.forEach(function(data) {
                        var role = new RoleModel(data);
                        role.group_id = newGroup._id;
                        role.created_on = new Date();
                        role.modified_on = new Date();
                        role.created_by = 'Karlsen Svend';
                        role.save();
                    });

                    res.send(newGroup);
                }
            });
        }
    });
};

var getGroupById = function(req, res) {
    GroupModel.findOne({_id : req.params.groupId },function(err, group) {
        res.send(group);
    });
};
var getGroupByUserId = function(req, res) {
    GroupModel.find({ members: { $elemMatch: { user_id: req.params.userId } } },function(err, groups) {
        res.send(groups);
    });
};

var deleteGroupById = function(req, res) {
    GroupModel.remove({_id: req.params.groupId}, function(err, group) {
        if(err) {
            console.log(err);
        } else {
            //RoleModel.remove({group_id: req.params.groupId}, function(err, role) {});
            res.send("success");
        }
    });
};

var groupUpdate = function(req, res) {
    var groupId = req.body.groupId;
    var groupBody = req.body.groupBody;

    GroupModel.findOneAndUpdate(
        { _id: groupId },
        { $set: {
            name: groupBody.name,
            //created_by: groupBody.created_by,  --this field is not allowed to be updated
            data: groupBody.data,
            members: groupBody.members,
            modified_on: new Date()
        }}
    ).exec(function(err, group) {
        if (err) {
            console.log(err);
        } else {
            res.jsonp(group);
        }
    });
};