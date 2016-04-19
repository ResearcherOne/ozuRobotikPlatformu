var express = require('express');
var router = express.Router();
var mongoModule = require('../models/mongoModule');

router.route('/getlist')
  .get(function (request, response){
	  mongoModule.getHardwareArray(function(err, hardwareArray)
    {
      var resultJSON = {hardwareList: hardwareArray}
      response.send(JSON.stringify(resultJSON));
    });
  });

module.exports = router;