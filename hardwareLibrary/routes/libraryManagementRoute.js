var express = require('express');
var router = express.Router();
var mongoModule = require('../models/mongoModule');
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false}); /*{extended: false} option do "force the use of the native querystring Node library"*/

router.route('/adduser')
  .get(function (request, response){

  });

router.route('/deleteuser')
  .post(function (request, response){

  });

router.route('/addhardware')
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
			mongoModule.addHardware(newHardware, function(isSuccess){
				if (isSuccess) {
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