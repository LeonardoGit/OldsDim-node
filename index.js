'use strict';


var kraken = require('kraken-js'),
    app = require('express')(),
    options = require('./lib/spec')(app),
    userLib = require('./lib/user')(),
    permissionLib = require('./lib/permission')(),
    port = process.env.PORT || 8080,
    express = require('express'),
    fs = require('fs');

app.use(express.static(__dirname + '/public'));
var bodyParser = require('body-parser');
app.use(bodyParser.json());

var routePath = "./controllers/api/v1/";
fs.readdirSync(routePath).forEach(function(file) {
    var route = routePath + file.replace('.js', '');
    require(route)(app);
});

app.use(kraken(options));


app.listen(port, function(err) {
    console.log('[%s] Listening on http://localhost:%d', app.settings.env, port);
});
