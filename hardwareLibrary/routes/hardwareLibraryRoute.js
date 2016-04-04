var express = require('express');
var app = express();
var router = express.Router();
//var bodyParser = require('body-parser');
//var parseUrlencoded = bodyParser.urlencoded({extended: false});

var hardwareListRoute = require('./hardwareListRoute');
var userManagementRoute = require('./userManagementRoute');
var userActionsRoute = require('./userActionsRoute');

app.use('/hardwareList', hardwareListRoute);
app.use('/userManagement', userManagementRoute);
app.use('/userActions', userActionsRoute);

module.exports = router;
