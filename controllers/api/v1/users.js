var UserModel = require('../../../models/user');


module.exports = function(router) {

    router.get('/api/v1/users', getAllUsers);
    router.post('/api/v1/users', createUser);
    //router.get('/api/v1/users/:userId', getUserById);
    router.get('/api/v1/users/:username', getUserByUsername);
    router.delete('/api/v1/users/:userId', deleteUserById);
    router.put('/api/v1/users', updateUser);
};

var getAllUsers = function(req, res) {
    UserModel.find(function(err, groups) {
        res.send(groups);
    });
}

var createUser = function(req, res) {
    req.body.created_on = new Date();
    req.body.modified_on = new Date();

    var group = new UserModel(req.body);

    UserModel.find({name: req.body.name},function(err, groups) {
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
                    res.send(newGroup);
                }
            });
        }
    });
}

var getUserById = function(req, res) {
    UserModel.findOne({_id : req.params.userId },function(err, user) {
        res.send(user);
    });
}

var getUserByUsername = function(req, res) {
    UserModel.findOne({login : req.params.username },function(err, user) {
        res.send(user);
    });
}

var deleteUserById = function(req, res) {
    UserModel.remove({_id: req.params.groupId}, function(err, group) {
        if(err) {
            console.log(err);
        } else {
            res.send("success");
        }
    });
}

var updateUser = function(req, res) {
    var groupId = req.body.groupId;
    var groupName = req.body.groupName;

    UserModel.find({_id: groupId},function(err, group) {
        group.data = groupName;
        group.modified_on = new Date();

        group.save(function(err) {
            if (err) {
                console.log(err);
            } else {
                res.jsonp("success");
            }
        });
    });
}