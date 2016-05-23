var express = require('express');
var router = express.Router();
var mongoModule = require('../models/mongoModule');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});

/* Middleware stuff
		var userMail = "birkan.kolcu@ozu.edu.tr";
		mongoModule.getUser(userMail, function (userArray){
			response.send(JSON.stringify(userArray));
		});
		
	libraryUser {
		fullName: "birkan kolcu"
		userMail: "birkan.kolcu@ozu.edu.tr"
		phone: "+90532..."
		status: "librarian"
		borrowLimit: 2
		reputation: 8
		hardwareBorrowed: [borrowData,borrowData,...]
		borrowLog: [borrowLogData, borrowLogData,...]
		addedDate: "properDateGoesHere"
	}
		borrowData {
			hardwareID:
			date:
		}
		
		borrowLog {
			hardwareID:
			borrowDate:
			returnDate:
		}
	Hardware {
		name: "Arduino UNO",
		description: "This well-known development board has taken over the world. If you did not use this you should get into the Arduino world!",
		imageLink: "http://g02.a.alicdn.com/kf/HTB1iMyHLXXXXXcGXXXXq6xXFXXXx/UNO-R3-MEGA328P-ATMEGA16U2-for-Arduino-Compatible-with-the-cable.jpg_220x220.jpg",
		tags: ["arduino", "development board", "uno"],
		total: 4,
		available: 1,
		addedDate: "properDateGoesHere",
	}
*/	
router.route('/borrowhardware')
	.post(parseUrlencoded, function (request, response){
		var hardwareData = request.body;
		var libraryUser = {
			fullName: "birkan kolcu",
			userMail: "birkan.kolcu@ozu.edu.tr",
			phone: "",
			status: "",
			borrowLimit: 5,
			reputation: 2,
			hardwareBorrowed: [],
			addedDate: Date.now()
		};
		var hardwareBorrowedCount = libraryUser.hardwareBorrowed.length;
		var reputation = libraryUser.reputation;
		var userMail = libraryUser.userMail;
		
		if(hardwareBorrowedCount < libraryUser.borrowLimit){
			if (reputation > 0){
				mongoModule.isHardwareAvailable(hardwareData.name, function(isAvailable){
					if (isAvailable){
						mongoModule.borrowHardware(userMail, hardwareData.name, function(isSucceed){
							if (isSucceed){
								var responseObject = {isSucceed: true, description: "Successfully borrowed the hardware."};
								response.json(responseObject);
							} else {
								var responseObject = {isSucceed: false, description: "Unable to borrow hardware."};
								response.json(responseObject);
							}
						});
					} else {
						var responseObject = {isSucceed: false, description: "Hardware is not available."};
						response.json(responseObject);
					}
				});
			} else {
				var responseObject = {isSucceed: false, description: "Reputation is too low to borrow hardware."};
				response.json(responseObject);
			}
		} else {
			var responseObject = {isSucceed: false, description: "Hardware borrow limit is reached."};
			response.json(responseObject);
		}
	});

router.route('/returnhardware')
	.post(parseUrlencoded, function (request, response){
		
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