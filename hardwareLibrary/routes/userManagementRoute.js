var express = require('express');
var app = express();
var router = express.Router();
//var bodyParser = require('body-parser');
//var parseUrlencoded = bodyParser.urlencoded({extended: false});

var mongoModule = require('../models/mongoModule');

router.route('/addUser')
  .get(function (request, response){

  });

router.route('/deleteUser')
  .post(function (request, response){

  });

module.exports = router;
