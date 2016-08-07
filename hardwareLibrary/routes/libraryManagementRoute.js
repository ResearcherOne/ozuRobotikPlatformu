var express = require('express');
var router = express.Router();
var mongoModule = require('../models/mongoModule');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false}); /*{extended: false} option do "force the use of the native querystring Node library"*/

router.route('/adduser')
	.post(parseUrlencoded, function (request, response){
		var postedUser = request.body;
		
		var libraryUser = {
			fullName: postedUser.fullName,
			userMail: postedUser.userMail,
			phone: postedUser.phone,
			status: postedUser.status,
			borrowLimit: 3,
			reputation: 1,
			hardwareBorrowed: [],
			addedDate: Date.now()
		};
		mongoModule.isUserExist(libraryUser.userMail, function(isUserExist){
			if(!isUserExist){
				mongoModule.addUser(libraryUser, function(isSuccess){
					var responseObject;
					if (isSuccess) {
						responseObject = {isSucceed: true, description: "Successfully added the user."};
					} else {
						responseObject = {isSucceed: false, description: "Unable to add the user."};
					}
					response.json(responseObject);
				});			
			} else {
				var responseObject = {isSucceed: false, description: "User with that mail already exists in Library."};
				response.json(responseObject);
			}
		});
  });

router.route('/deleteuser')
	.post(parseUrlencoded, function (request, response){
		var postedData = request.body;
		
		mongoModule.isUserExist(postedData.userMail, function(isUserExist){
			if(isUserExist){
				mongoModule.deleteUser(postedData.userMail, function(isSuccess){
					var responseObject;
					if (isSuccess) {
						responseObject = {isSucceed: true, description: "Successfully deleted the user."};
					} else {
						responseObject = {isSucceed: false, description: "Unable to delete the user."};
					}
					response.json(responseObject);
				});			
			} else {
				var responseObject = {isSucceed: false, description: "User with that mail does NOT exist in Library."};
				response.json(responseObject);
			}
		});
	});
	
router.route('/getusers')
	.get(function (request, response){
		mongoModule.getUserArray(function(err, userArray)
		{
			var resultJSON = {userList: userArray};
			response.send(JSON.stringify(resultJSON));
		});
	});

router.route('/addhardware')
	.post(parseUrlencoded, function (request, response){
		var postedHardware = request.body;
		
		var newHardware = { //Is what am i going best practice? I thought it would be (somehow) safer to pick right values from incoming data instead of saving as it recieved. 
			name: postedHardware.name,
			description: postedHardware.description,
			imageLink: postedHardware.imageLink,
			tags: postedHardware.tags,
			total: parseInt(postedHardware.total),
			available: parseInt(postedHardware.available),
			addedDate: Date.now(),
		};
		mongoModule.isHardwareExist(newHardware.name, function(isHardwareExist){
			if(!isHardwareExist && newHardware.total > 0){
				mongoModule.addHardware(newHardware, function(isSuccess){
					var responseObject;
					if (isSuccess) {
						responseObject = {isSucceed: true, description: "Successfully added the hardware."};
					} else {
						responseObject = {isSucceed: false, description: "Unable to add the hardware."};
					}
					response.json(responseObject);
				});			
			} else {							
				var desc;
				if (newHardware.total < 1)
					desc = "Total amount of hardware must be positive.";
				else 
					desc = "Hardware with that name already exists in Library.";

				var responseObject = {isSucceed: false, description: desc};
				response.json(responseObject);
			}
		});
	});
	
router.route('/deletehardware')
	.post(parseUrlencoded, function (request, response){
		var postedHardwareData = request.body;
		
		mongoModule.isHardwareExist(postedHardwareData.name, function(isHardwareExist){
			if(isHardwareExist){
				mongoModule.deleteHardware(postedHardwareData.name, function(isSuccess){
					var responseObject;
					if (isSuccess) {
						responseObject = {isSucceed: true, description: "Successfully deleted the hardware."};
					} else {
						responseObject = {isSucceed: false, description: "Unable to delete the hardware."};
					}
					response.json(responseObject);
				});		
			} else {
				var responseObject = {isSucceed: false, description: "Hardware with that name does NOT exist in Library."};
				response.json(responseObject);
			}
		});
	});

router.route('/deducthardware')
	.post(parseUrlencoded, function (request, response){
		var hardwareData = request.body;
		
		var requestedHardwareCount 	= parseInt(hardwareData.count);
		var requestedHardwareName 	= hardwareData.name;
		
		mongoModule.isHardwareAvailable(requestedHardwareName, requestedHardwareCount, function(isAvailable){
			if(isAvailable  && requestedHardwareCount > 0){
				mongoModule.deductHardware(requestedHardwareName, requestedHardwareCount, function(isSuccess){
					if (isSuccess) {
						var responseObject = {isSucceed: true, description: "Successfully deducted the hardware."};
						response.json(responseObject);
					} else {
						var responseObject = {isSucceed: false, description: "Unable to deduct the hardware."};
						response.json(responseObject);
					}
				});		
			} else {
				var desc;
				if (requestedHardwareCount < 1)
					desc = "Hardware amount must be positive.";
				else 
					desc = "This amount of the hardware does NOT exist in Library.";

				var responseObject = {isSucceed: false, description: desc};
				response.json(responseObject);
			}
		});
	});
	
router.route('/incrementhardware')
	.post(parseUrlencoded, function (request, response){
		var hardwareData = request.body;
		
		var requestedHardwareCount 	= parseInt(hardwareData.count);
		var requestedHardwareName 	= hardwareData.name;
		
		mongoModule.isHardwareExist(requestedHardwareName, function(isAvailable){
			if(isAvailable && requestedHardwareCount > 0){
				mongoModule.incrementHardware(requestedHardwareName, requestedHardwareCount, function(isSuccess){
					if (isSuccess) {
						var responseObject = {isSucceed: true, description: "Successfully incremented the hardware."};
						response.json(responseObject);
					} else {
						var responseObject = {isSucceed: false, description: "Unable to increment the hardware."};
						response.json(responseObject);
					}
				});		
			} else {
				var desc;
				if (requestedHardwareCount < 1)
					desc = "Hardware amount must be positive.";
				else 
					desc = "Hardware with that name does NOT exist in Library.";

				var responseObject = {isSucceed: false, description: desc};
				response.json(responseObject);
			}
		});
	});

module.exports = router;