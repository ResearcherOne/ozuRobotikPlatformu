var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false}); /*{extended: false} option do "force the use of the native querystring Node library"*/
var mongoModule = require('../models/mongoModule');

router.route('/test123/:hardwarename')
  .get(function (request, response){
	  var hardwarename = request.params.hardwarename;
	  mongoModule.isHardwareExist(hardwarename,function(err, result)
    {
      var resultJSON = {hardwareList: result}
      response.send(JSON.stringify(resultJSON));
    });
  });

router.route('/getlist')
  .get(function (request, response){
	  mongoModule.getHardwareArray(function(err, hardwareArray)
    {
      var resultJSON = {hardwareList: hardwareArray}
      response.send(JSON.stringify(resultJSON));
    });
  });

/*
	Hardware {
		id: "0"
		name: "Arduino UNO",
		description: "This well-known development board has taken over the world. If you did not use this you should get into the Arduino world!",
		imageLink: "http://g02.a.alicdn.com/kf/HTB1iMyHLXXXXXcGXXXXq6xXFXXXx/UNO-R3-MEGA328P-ATMEGA16U2-for-Arduino-Compatible-with-the-cable.jpg_220x220.jpg",
		tags: ["arduino", "development board", "uno"],
		total: 4,
		available: 1,
		addedDate: "properDateGoesHere",
	}
*/

router.route('/addhardware') //add isLibrarian middleware
  .post(parseUrlencoded, function (request, response){
	var userMail = "birkan.kolcu@ozu.edu.tr";
	var postedHardware = request.body;
	var newHardware = { //Is what am i going best practice? I thought it would be (somehow) safer to pick right values from incoming data instead of saving as it recieved. 
		name: postedHardware.name,
		description: postedHardware.description,
		imageLink: postedHardware.imageLink,
		tags: postedHardware.tags,
		total: postedHardware.total,
		available: postedHardware.available,
		addedDate: Date.now(),
	};
	//isLibrarian(userMail)
		//isHardwareExist
			mongoModule.addHardware(newHardware, function(add_result){
				if (add_result) {
					var responseObject = {result: true, description: "Successfully added the hardware."}; //is sending suh responseObject is among the best practices between front-end backend comminication 
				} else {
					var responseObject = {result: false, description: "Unable to add the hardware."};
				}
				response.status(201).json(responseObject); //should i send json with status code 201 anyway? Or when unsucceed send error? What is best practice.
			});
		/* else
			var responseObject = {result: false, description: "Hardware with that name already exists in Library."};
		*/
	/* else
			var responseObject = {result: false, description: "Unauthorized person cannot add new hardware."};
	*/
  });

module.exports = router;