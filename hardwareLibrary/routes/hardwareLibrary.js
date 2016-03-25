var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});

//TO BE DELETED
var mongoModule = require('../bin/mongoModule');
//TO BE DELETED

router.route('/hardwarelist')
  .get(function (request, response){
      mongoModule.insertObject("tokenList", {"token" : "birkan.kolcu", "status" : "available" }, function(){console.log("ok.")});
  });

module.exports = router;
