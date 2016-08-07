var express = require('express');
var router = express.Router();
var mongoModule = require('../models/mongoModule');
var authModule = require('../models/authModule');
var bodyParser = require('body-parser');

var parseUrlencoded = bodyParser.urlencoded({extended: false});

router.route('/requestToken')
	.post(parseUrlencoded, function (request, response){
		var authData = request.body;
		var libraryUser = request.libraryUser;
		var userMail = authData.username;
		
		if (libraryUser.status === "anonymous"){ //make time limit for token request per mail
			mongoModule.isUserExist(userMail, function(isUserExist){
				if(isUserExist && authModule.isOzuMail(userMail)) {
					var token = authModule.generateToken();
					authModule.saveLoginToken(token, userMail, function(err, result){
						if(!err) {
							authModule.sendLoginLink(token, userMail);
							authModule.setTokenExpirationTime(token, 120); //Token will expire in 120 minutes.
							var responseObject = {isSucceed: true, description: "Login link is sent to your mail."};
							response.json(responseObject);	
						} else {
							var responseObject = {isSucceed: true, description: "Error occoured during obtaining token."};
							response.json(responseObject);	
						}
					});
				} else {
					var responseObject = {isSucceed: false, description: "Invalid user."};
					response.json(responseObject);
				}
			});
		} else {
			var responseObject = {isSucceed: false, description: "User already logged in."};
			response.json(responseObject);
		}
	});

router.route('/login/:token')
	.get(function (request, response) {
		var libraryUser = request.libraryUser;
		var token = request.params.token;

		if (libraryUser.status === "anonymous"){
			authModule.isValidToken(token, function(err, isValid){
				if (!err && isValid){
					request.session.token = token;
					response.redirect('/');
				} else {
					var responseObject = {isSucceed: false, description: "Token is not valid."};
					response.json(responseObject);
				}
			});
		} else {
			response.redirect('/'); //User is already logged in.
		}
	});

router.route('/logout')
	.get(function (request, response){
		if (libraryUser.status !== "anonymous"){
			authModule.isValidToken(token, function(err, isValid){
				if (!err && isValid){
					authModule.destroyLoginToken(token);
					request.session.token = 0;
					response.redirect('/');
				} else {
					var responseObject = {isSucceed: false, description: "Token is not valid."};
					response.json(responseObject);
				}
			});
		} else {
			var responseObject = {isSucceed: false, description: "User is not logged in."};
			response.json(responseObject);
		}
	});

module.exports = router;