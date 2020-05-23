"use strict";
const print = console.log;
const endpoint = "http://localhost:3000/api";

const router = require('express').Router();
const axios = require('axios');

const api = require('../api/controllers/index');
const {get_request, post_request} = require('./api_request');

/* Login, Signup and Search */
router.get('/', function(req, res, next) {
  
  res.render('index', { title: 'Login/Signup page'});
});

router.get('/account/:username', function(req, res, next) {
  let username = req.params.username;
  let url = endpoint + `/${username}`
  let token = req.cookies.access_token;
  
  get_request(url, token)
  .then( result => {
    let shares = result.data.available;
    res.render('user', {username : username, shares : shares});
  })
  .catch( err => print(err));
  
});


router.post('/auth', (req, res, next) => {

  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;


  if(email){

    let data = {username : username, email : email, password : password};
    let url = endpoint + "/signup";
    post_request(url, data)
    .then( result => print(result))
    .catch(error => print(error));
    
  }

  else{

    let data = {id  : username,  password : password};
    let url = endpoint + "/login";
    post_request(url, data)
    .then( result => {
      // insert access_token into cookie
      // req.cookies.access_token = result.token;
      res.cookie("access_token", result.token);
      res.redirect(`/account/${result.username}`);
    })
    .catch( error => {
        print(error);
    });

  }


});

module.exports = router;
