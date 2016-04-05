var express = require('express');
var router = express.Router();

var hardwareListRoute = require('./hardwareListRoute');
var userManagementRoute = require('./userManagementRoute');
var userActionsRoute = require('./userActionsRoute');

router.use('/hardwarelist', hardwareListRoute);
router.use('/usermanagement', userManagementRoute);
router.use('/useractions', userActionsRoute);

module.exports = router;