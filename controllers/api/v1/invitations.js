/** 
 * Invitation API calls
 */

var InvitationModel = require('../../../models/invitation');
var GroupModel = require('../../../models/group');

module.exports = function(router) {

    router.get('/api/v1/invitations', getAllInvitations);
    router.post('/api/v1/invitations', createInvitation);
    router.get('/api/v1/invitations/:invitationId', getInvitationById);
    router.get('/api/v1/invitations/user/:userEmail', getInvitationsByUserEmail);
    router.delete('/api/v1/invitations/:invitationId', deleteInvitationById);
    router.put('/api/v1/invitations', invitationUpdate);
};

var getAllInvitations = function(req, res) {
    InvitationModel.find(function(err, invitations) {
        res.jsonp(invitations);
    });
}

/** This call allow to create a new Invitaion object
 * @param Invitation object: {group_id: string, user_email: string, status: string, created_by: string}
 *
 */
var createInvitation = function(req, res) {
    req.body.created_on = new Date();

    var invitation = new InvitationModel(req.body);

    InvitationModel.find({user_email: req.body.user_email, group_id: req.body.group_id}, function(err, invitations) {
        if (invitations.length > 0) { //check if invitation for pair {group_id, user_email} already exists
            res.send({
                errorCode: 201,
                errorMessage: 'You already have a invitation with this user email for specified group.'
            });
        } else {
    		GroupModel.find({
                group_id: req.body.group_id, 
                members: {$elemMatch: {email: req.body.user_email}}
            }, function (err, groups) {
				if (groups.length > 0) {//check if user belongs to the specified group
					res.send({
                        errorCode: 201,
                        errorMessage: 'User with such email already exists in specified group.'
                    });
				}
                else {
                    invitation.save(function(err, newinvitation) {
                        if (err) {
                            console.log(err);
                        } else {
                            res.jsonp(newinvitation);
                        }
                    });                    
                }
    		});
        }
    });
}

var getInvitationById = function(req, res) {
    InvitationModel.findOne({
        _id: req.params.invitationId
    }, function(err, invitation) {
        res.jsonp(invitation);
    });
}

var getInvitationsByUserEmail = function(req, res) {
    InvitationModel.find({
        user_email: req.params.user_email
    }, function(err, invitations) {
        res.jsonp(invitations);
    });
}

var deleteInvitationById = function(req, res) {
    InvitationModel.remove({
        _id: req.params.invitationId
    }, function(err, invitation) {
        if (err) {
            console.log(err);
        } else {
            res.jsonp("success");
        }
    });
}

var invitationUpdate = function(req, res) {
    var invitationId = req.body.invitationId;
    var invitationStatus = req.body.invitationStatus;

    InvitationModel.findOneAndUpdate(
        { _id: req.body.invitationId },
        { $set: {
            status: req.body.invitationStatus
        }}
    ).exec(function(err, invitation) {
        if (err) {
            console.log(err);
        } else {
            res.jsonp(invitation);
        }
    });
}
