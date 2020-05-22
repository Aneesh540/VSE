const print = console.log;

var express = require('express');
var router = express.Router();

const api = require('../api/controllers/index');

/* GET home page. */
router.get('/', function(req, res, next) {

  let shares = [{code : "LT", price : 800.12, qty : 10},
  {code : "SBIN", price : 155, qty : 150},
  {code : "NIFTY", price : 800.12, qty : 10},
  {code : "HUL", price : 2000, qty : 10}  ];
  
  res.render('user', { title: 'Express app', shares : shares });
});

module.exports = router;
