var express = require('express');
var router = express.Router();
var mongoModule = require('../models/mongoModule');

router.route('/borrowaction')
  .get(function (request, response){

  });

router.route('/returnaction')
  .post(function (request, response){

  });

module.exports = router;