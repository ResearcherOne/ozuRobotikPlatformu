var tokenGenerator = require('rand-token').uid;
var redisWrapper = require('./redisWrapper');
var mailerModule = require('../models/mailerModule');

module.exports = {
	generateToken: function(){
		return tokenGenerator(16);
	},
	saveLoginToken: function(token, userMail, callback){
		redisWrapper.setValue(token, userMail, function(err, result){
			callback(err, result);
		});
	},
	destroyLoginToken: function(token, callback){
		redisWrapper.deleteKey(token, function(err, result){
			callback(err, result);
		});
	},
	isValidToken: function(token, callback){
		redisWrapper.isKeyExists(token, function(err, isExists){
			callback(err, isExists);
		});
	},
	getUserMail: function(token, callback){
		redisWrapper.getValue(token, function(error, result){
			callback(error, result);
		});
	},
	sendLoginLink: function(token, userMail){
		var loginLink = "http://birkankolcu.com/auth/login/"+token //href yolla, gorunusu Click to Login olsun
		console.log("IMA HERE");
		mailerModule.sendMail(userMail, "birkan.kolcu@ozudevelopers.com", "Your login link for hardware library.", loginLink);
	},
	setTokenExpirationTime: function(token, expirationTimeInMinutes){
		redisWrapper.setExpirationTime(token, expirationTimeInMinutes*60);
	},
	isOzuMail: function(mailAddress){
		var parsedMail = mailAddress.toString().split("@");
		var fullName = parsedMail[0];
		var domain = parsedMail[1];
		var isValidDomain = domain === "ozu.edu.tr";
		var isValidLength = parsedMail.length == 2;
		return isValidDomain && isValidLength;
	}
};