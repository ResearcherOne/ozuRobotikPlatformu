var express = require('express');
var app = express();
var router = express.Router();
//var bodyParser = require('body-parser');
//var parseUrlencoded = bodyParser.urlencoded({extended: false});

var mongoModule = require('../models/mongoModule');

router.route('/getList')
  .get(function (request, response){
	  mongoModule.getHardwareArray(function(hardwareArray)
    {
      var resultJSON = {hardwareList: hardwareArray}
      response.send(JSON.stringify(resultJSON));
    });
  });

router.route('/addHardware')
  .post(function (request, response){
	var userMail = "birkan.kolcu@ozu.edu.tr";
	//mongoModule.addHardware(userMail,hardwareObject,function(result){});
  });

module.exports = router;