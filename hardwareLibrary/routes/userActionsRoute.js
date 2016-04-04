var express = require('express');
var app = express();
var router = express.Router();
//var bodyParser = require('body-parser');
//var parseUrlencoded = bodyParser.urlencoded({extended: false});

router.route('/borrowAction')
  .get(function (request, response){

  });

router.route('/returnAction')
  .post(function (request, response){

  });

module.exports = router;