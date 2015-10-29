/** 
 * Chart API calls
 */

var chartModel = require('../../../models/chart');


module.exports = function(router) {

    router.get('/api/v1/charts', getAllCharts);
    router.post('/api/v1/charts', createChart);
    router.get('/api/v1/charts/:chartId', getChartById);
    router.get('/api/v1/charts/group/:group_id', getChartsByGroupId);
    router.delete('/api/v1/charts/:chartId', deleteChartById);
    router.put('/api/v1/charts', chartUpdate);
};

var getAllCharts = function(req, res) {
    chartModel.find(function(err, charts) {
        res.jsonp(charts);
    });
}

/** This call allow to create a new Chart object
 * @param chart object: {group_id: string, file_id: string, title: string, data: array, created_by: string, modified_by: string}
 *
 */
var createChart = function(req, res) {
    req.body.created_on = new Date();
    req.body.modified_on = new Date();

    var chart = new chartModel(req.body);

    chart.save(function(err, newchart) {
        if (err) {
            console.log(err);
        } else {
            res.jsonp(newchart);
        }
    });                    

}

var getChartById = function(req, res) {
    chartModel.findOne({
        _id: req.params.chartId
    }, function(err, chart) {
        res.jsonp(chart);
    });
}

var getChartsByGroupId = function(req, res) {
    chartModel.find({
        group_id: req.params.group_id
    }, function(err, charts) {
        res.jsonp(charts);
    });
}

var deleteChartById = function(req, res) {
    chartModel.remove({_id: req.params.chartId}, function(err, group) {
        if(err) {
            console.log(err);
        } else {
            //RoleModel.remove({group_id: req.params.groupId}, function(err, role) {});
            res.send("success");
        }
    });
}

var chartUpdate = function(req, res) {
    var chartId = req.body._id;
    var chartBody = req.body.chartBody;

    chartModel.findOneAndUpdate(
        { _id: chartId },
        { $set: {
            data: chartBody.data,
            title: chartBody.title,
            file_id : chartBody.file_id,
            modified_on: new Date(),
            modified_by: chartBody.modified_by
        }}
    ).exec(function(err, chart) {
        if (err) {
            console.log(err);
        } else {
            res.jsonp(chart);
        }
    });
}

