var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false}); /*{extended: false} option do "force the use of the native querystring Node library"*/
var mongoModule = require('../models/mongoModule');

router.route('/getlist')
  .get(function (request, response){
	  mongoModule.getHardwareArray(function(hardwareArray)
    {
      var resultJSON = {hardwareList: hardwareArray}
      response.send(JSON.stringify(resultJSON));
    });
  });
  
router.route('/testList')
  .get(function (request, response){
	  mongoModule.getHardwareArray(function(hardwareArray)
    {
      var resultJSON = {hardwareList: hardwareArray}
	  response.jsonp(resultJSON);
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
  .post(parseUrlencoded,allowCrossDomain,function (request, response){
	
	var userMail = "birkan.kolcu@ozu.edu.tr";
	var postedHardware = request.body;
	var newHardware = {
		id: postedHardware.id,
		name: postedHardware.name,
		description: postedHardware.description,
		imageLink: postedHardware.imageLink,
		tags: postedHardware.tags,
		total: postedHardware.total,
		available: postedHardware.available,
		addedDate: Date.now(),
	};
	
	mongoModule.addHardware(userMail, newHardware, function(add_result){
		if (add_result) {
			var responseObject = {name: newHardware.name, status: "Successfully added the hardware."}; //should i send messages as status or send true/false and show error accordingly in the front-end
		} else {
			var responseObject = {name: newHardware.name, status: "Unable to add the hardware."};
		}
		response.status(201).jsonp(responseObject); //should i send json with status code 201 anyway? Or when unsucceed send error? What is best practice.
	});
  });

module.exports = router;