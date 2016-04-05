var express = require('express');
var router = express.Router();
var mongoModule = require('../models/mongoModule');

router.route('/getlist')
  .get(function (request, response){
	  mongoModule.getHardwareArray(function(hardwareArray)
    {
      var resultJSON = {hardwareList: hardwareArray}
      response.send(JSON.stringify(resultJSON));
    });
  });


router.route('/addhardware')
  .post(function (request, response){
	var userMail = "birkan.kolcu@ozu.edu.tr";
	//mongoModule.addHardware(userMail,hardwareObject,function(result){});
  });

module.exports = router;