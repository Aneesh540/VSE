const print = console.log;

var express = require('express');
var router = express.Router();

const api = require('../api/controllers/index');

/* GET home page. */
router.get('/', function(req, res, next) {
  
  res.render('index', { title: 'Express app' });
});

module.exports = router;
