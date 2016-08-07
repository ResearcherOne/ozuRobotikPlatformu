var express = require('express');
var router = express.Router();
var mongoModule = require('../models/mongoModule');

router.route('/test123/:hardwarename')
  .get(function (request, response){
	  var hardwarename = request.params.hardwarename;
	  mongoModule.isHardwareExist(hardwarename, function(err,isHardwareExist)
    {
		if (isHardwareExist) {
			var responseObject = {result: true, description: "Hardware already exists."};
		} else {
			var responseObject = {result: true, description: "Hardware does not exist."};
		}
		response.status(201).json(responseObject);
    });
  });
  
module.exports = router;