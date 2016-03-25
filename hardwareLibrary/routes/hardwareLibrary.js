var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});

//TO BE DELETED
var mongoModule = require('../bin/mongoModule');
//TO BE DELETED

router.route('/hardwarelist')
  .get(function (request, response){
    mongoModule.getCollection("tokenList", function(err, result)
    {
      var resultJSON = JSON.stringify(result);
      response.send(resultJSON);
      console.log(resultJSON);
    });
  });

module.exports = router;
