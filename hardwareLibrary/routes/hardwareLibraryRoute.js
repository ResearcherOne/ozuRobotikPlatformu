var express = require('express');
var router = express.Router();

var libraryManagementRoute = require('./libraryManagementRoute');
var userActionsRoute = require('./userActionsRoute');
var publicActionsRoute = require('./publicActionsRoute');

function isUserMiddleware(request, response, next){
	var libraryUser = request.libraryUser;
	if (libraryUser.status === "user" || libraryUser.status === "librarian"){
		next();
	} else {
		var responseObject = {isSucceed: false, description: "Anonymous user can not perform user actions."};
		response.json(responseObject);
	}
}

function isLibrarianMiddleware(request, response, next){
	var libraryUser = request.libraryUser;
	if (libraryUser.status === "librarian"){
		next();
	} else {
		var responseObject = {isSucceed: false, description: "Only librarian can perform library management."};
		response.json(responseObject);
	}
}

router.use('/librarymanagement', isLibrarianMiddleware, libraryManagementRoute);
router.use('/useractions', isUserMiddleware, userActionsRoute);
router.use('/publicactions', publicActionsRoute);

module.exports = router;