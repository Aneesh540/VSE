"use strict";
const print = console.log;
const endpoint = "http://localhost:3000/api";


const router = require('express').Router();

const api = require('../api/controllers/index');
const {get_request, post_request} = require('./api_request');


/* Login-Signup page  */
router.get('/', function(req, res, next) {
  
  res.render('index', { title: 'Login/Signup page'});
});

/* Login & Signup route  */
router.post('/auth', (req, res, next) => {

	const email = req.body.email;
	const username = req.body.username;
	const password = req.body.password;
  
  
	if(email){ // if email is present then user want to signup else login
  
	  let data = {username : username, email : email, password : password};
	  let url = endpoint + "/signup";
	  post_request(url, data)
	  .then( result => {
			res.render('index', { title: 'Login/Signup page', redirect : true});
		})
	  .catch(error => {
			res.status(500).json({error : error});
		});
	  
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
		  error : error
	  });
  
	}
  
  
  });

/* search for shares*/
router.post('/search', (req, res, next) =>{
	let username = req.body.username || 'No user';
	let query = req.body.search_query;

	let search_code = get_request(endpoint + `/NSE_code/${query}`);
	let search_name = get_request(endpoint + `/NSE_name/${query}`);

	Promise.all([search_code, search_name])
	.then( (value_list) => {
		let [code_request, name_request] = value_list;
		let search_result = name_request.data;

		if(code_request.statusCode === 200){
			search_result.unshift(code_request.data);
		}

		res.render('search', {username : username, query: query, search_result :search_result});
		

	})
	.catch( (error) => res.json({error : error}) );


});


/* Show Demat Account  */
router.get('/account/:username', function(req, res, next) {
  let username = req.params.username;
  let url = endpoint + `/${username}`
	let token = req.cookies.access_token;
	
	if(!token){
		res.render('broken', {title : "AuthError"});
	}
  
  get_request(url, token)
  .then( result => {

		

		if(result.statusCode !== 200){
			res.render('broken', {title : "AuthError"});
		}

		let shares = result.data.available;
		
		res.render('demat', {username : username, 
			shares : shares,
			 buy : result.data.total_buy, 
			sell : result.data.total_sell});
  })
  .catch( err => {
		res.status(500).json({error : error});
	});
  
});


/* Particular share details */
router.get('/share/:nse_code/:username', function(req, res, next){
	const nse_code = req.params.nse_code;
	const username = req.params.username;
	const token = req.cookies.access_token;
	

	const url1 = endpoint + `/NSE_code/${nse_code}`
	const url2 = endpoint + `/${username}/${nse_code}` 
	
	let stock_price =  get_request(url1);
	let user_stock_list = get_request(url2, token);

	Promise.all([stock_price, user_stock_list])
	.then((values) => {
		let stock_info = values[0].data;
		if(values[1].statusCode === 401){
		
			res.render('broken', {title : "AuthError"});
		}

		else{
			let share_list = values[1].data;
			res.render('share', {username : username, stock_info: stock_info, share_list : share_list });
		}
		
		
	})
	.catch((error) => {
		res.status(500).json({error : error});
	});
	
});


module.exports = router;
