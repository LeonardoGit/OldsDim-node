/** 
 * Dashboard API calls
 */

var dashboardModel = require('../../../models/dashboard');


module.exports = function(router) {

    router.get('/api/v1/dashboards', getAllDashboards);
    router.post('/api/v1/dashboards', createDashboard);
    router.get('/api/v1/dashboards/:dashboardId', getDashboardById);
    router.get('/api/v1/dashboards/group/:group_id', getDashboardsByGroupId);
    router.delete('/api/v1/dashboards/:dashboardId', deleteDashboardById);
    router.put('/api/v1/dashboards', dashboardUpdate);
};

var getAllDashboards = function(req, res) {
    dashboardModel.find(function(err, dashboards) {
        res.jsonp(dashboards);
    });
}

/** This call allow to create a new Dashboard object
 * @param dashboard object: {group_id: string, file_id: string, title: string, data: array, created_by: string, modified_by: string}
 *
 */
var createDashboard = function(req, res) {
    req.body.created_on = new Date();
    req.body.modified_on = new Date();

    var dashboard = new dashboardModel(req.body);

    dashboard.save(function(err, newdashboard) {
        if (err) {
            console.log(err);
        } else {
            res.jsonp(newdashboard);
        }
    });                    

}

var getDashboardById = function(req, res) {
    dashboardModel.findOne({
        _id: req.params.dashboardId
    }, function(err, dashboard) {
        res.jsonp(dashboard);
    });
}

var getDashboardsByGroupId = function(req, res) {
    dashboardModel.find({
        group_id: req.params.group_id
    }, function(err, dashboards) {
        res.jsonp(dashboards);
    });
}

var deleteDashboardById = function(req, res) {
    dashboardModel.remove({_id: req.params.dashboardId}, function(err, group) {
        if(err) {
            console.log(err);
        } else {
            //RoleModel.remove({group_id: req.params.groupId}, function(err, role) {});
            res.send("success");
        }
    });
}

var dashboardUpdate = function(req, res) {
    var dashboardId = req.body._id;
    var dashboardBody = req.body.dashboardBody;

    dashboardModel.findOneAndUpdate(
        { _id: dashboardId },
        { $set: {
            data: dashboardBody.data,
            title: dashboardBody.title,
            modified_on: new Date(),
            modified_by: dashboardBody.modified_by
        }}
    ).exec(function(err, dashboard) {
        if (err) {
            console.log(err);
        } else {
            res.jsonp(dashboard);
        }
    });
}

