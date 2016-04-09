var express = require('express');
var router = express.Router();

var hardwareListRoute = require('./hardwareListRoute');
var userManagementRoute = require('./userManagementRoute');
var userActionsRoute = require('./userActionsRoute');

router.use('/hardwarelist', hardwareListRoute); 	//delete this route
router.use('/usermanagement', userManagementRoute); //isLibrarian middleware will be added
router.use('/useractions', userActionsRoute);		

module.exports = router;