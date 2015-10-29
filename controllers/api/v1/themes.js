var ThemeModel = require('../../../models/theme');

module.exports = function(router) {
    router.post('/api/v1/themes', createTheme);
    router.get('/api/v1/themes/:themeId', getThemeById);
    router.get('/api/v1/themes/group/:groupId', getThemeByGroupId);
    router.get('/api/v1/themes/dashboard/:themeId', getDashboardThemeById);
    router.get('/api/v1/themes/chart/:themeId', getChartThemeById);
    router.get('/api/v1/themes/table/:themeId', getTableThemeById);
    router.delete('/api/v1/themes/:themeId', deleteThemeById);
    router.put('/api/v1/themes', themeUpdate);
};

var getThemeByGroupId = function(req, res) {
    ThemeModel.find({ $or:[{group_id: 'default'}, {group_id: req.params.groupId}] },function(err, themes) {
        res.send(themes);
    });
};


var createTheme = function(req, res) {

}

var getThemeById = function(req, res) {

}

var getDashboardThemeById = function(req, res) {

}

var getChartThemeById = function(req, res) {

}

var getTableThemeById = function(req, res) {

}


var deleteThemeById = function(req, res) {

}


var themeUpdate = function(req, res) {

}

