'use strict';

var Permission = require('../models/permission');

var PermissionLibrary = function() {
    return {
        addPermissions: function() { //add four permissions
            var u1 = new Permission({
                name: 'view'
            });

            var u2 = new Permission({
                name: 'edit'
            });

            var u3 = new Permission({
                name: 'create'
            });

            var u4 = new Permission({
                name: 'delete'
            });

            //Ignore errors. In this case, the errors will be for duplicate keys as we run this app more than once.
            u1.save();
            u2.save();
            u3.save();
            u4.save();
        },
        serialize: function(permission, done) {
            done(null, permission);
        },
        deserialize: function(permission, done) {
            Permission.findOne({
                _id: permission.id
            }, function(err, permission) {
                done(null, permission);
            });
        }
    };
};

module.exports = PermissionLibrary;
