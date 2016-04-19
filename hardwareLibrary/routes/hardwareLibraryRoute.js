var express = require('express');
var router = express.Router();

var libraryManagementRoute = require('./libraryManagementRoute');
var userActionsRoute = require('./userActionsRoute');
var publicActionsRoute = require('./publicActionsRoute');

router.use('/librarymanagement', libraryManagementRoute); 	//isLibrarian middleware will be added
router.use('/useractions', userActionsRoute);				//isUser middleware will be added
router.use('/publicactions', publicActionsRoute);

module.exports = router;