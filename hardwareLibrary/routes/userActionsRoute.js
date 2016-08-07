var express = require('express');
var router = express.Router();
var mongoModule = require('../models/mongoModule');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});

router.route('/borrowhardware')
	.post(parseUrlencoded, function (request, response){
		var hardwareData = request.body;
		var libraryUser = request.libraryUser;
		
		var requestedHardwareCount 	= parseInt(hardwareData.count);
		var requestedHardwareName 	= hardwareData.name;
		
		var hardwareBorrowedCount = mongoModule.getTotalHardwareBorrowedCount(libraryUser);
		var hardwareBorrowedList = libraryUser.hardwareBorrowed;
		var reputation = libraryUser.reputation;
		var userMail = libraryUser.userMail;
		
		if(hardwareBorrowedCount+requestedHardwareCount <= libraryUser.borrowLimit && requestedHardwareCount != 0){
			if (reputation > 0){
				mongoModule.isHardwareAvailable(requestedHardwareName, requestedHardwareCount, function(isAvailable){
					if (isAvailable){
						mongoModule.borrowHardware(userMail, requestedHardwareName, requestedHardwareCount, hardwareBorrowedList, function(isSucceed){
							if (isSucceed){
								var responseObject = {isSucceed: true, description: "Successfully borrowed the hardware."};
								response.json(responseObject);
							} else {
								var responseObject = {isSucceed: false, description: "Unable to borrow hardware."};
								response.json(responseObject);
							}
						});
					} else {
						var responseObject = {isSucceed: false, description: "This amount of the hardware is not available."};
						response.json(responseObject);
					}
				});
			} else {
				var responseObject = {isSucceed: false, description: "Reputation is too low to borrow hardware."};
				response.json(responseObject);
			}
		} else {
			var desc;
			if (requestedHardwareCount == 0)
				desc = "Cannot borrow zero amount of hardware.";
			else 
				desc = "Hardware borrow limit is reached.";

			var responseObject = {isSucceed: false, description: desc};
			response.json(responseObject);
		}
	});

router.route('/returnhardware')
	.post(parseUrlencoded, function (request, response){
		var libraryUser = request.libraryUser;
		var hardwareData = request.body;
		
		var userMail = libraryUser.userMail;
		var hardwareBorrowedList = libraryUser.hardwareBorrowed;
		
		var requestedHardwareCount 	= parseInt(hardwareData.count);
		var requestedHardwareName 	= hardwareData.name;
		if(mongoModule.isAmountOfHardwareBorrowed(hardwareBorrowedList, requestedHardwareName, requestedHardwareCount) && requestedHardwareCount != 0) {
			mongoModule.returnHardware(userMail, requestedHardwareName, requestedHardwareCount, hardwareBorrowedList, function(isSucceed){
				if (isSucceed) {
					var responseObject = {isSucceed: false, description: "Hardware is successfully returned."};
					response.json(responseObject);
				} else {
					var responseObject = {isSucceed: false, description: "Hardware could not be returned."};
					response.json(responseObject);
				}
			});
		} else {
			var desc;
			if (requestedHardwareCount == 0)
				desc = "Cannot return zero amount of hardware.";
			else 
				desc = "This amount of hardware is not borrowed by the user.";
		
			var responseObject = {isSucceed: false, description: desc};
			response.json(responseObject);
		}
		
	});

router.route('/gethardwarelist')
	.get(function (request, response){
		mongoModule.getHardwareArray(function(err, hardwareArray)
		{
			var resultJSON = {hardwareList: hardwareArray};
			response.send(JSON.stringify(resultJSON));
		});
	});

module.exports = router;