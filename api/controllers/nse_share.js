"use strict";
const print = console.log;

const Trader = require('../models/users');
const NSE_COMPANIES = require('../models/nse_companies');

const company_details = function(req, res, next){
    let pattern = "^(\\s)*" + req.params.code + "(\\s)*$";
    // we are using pattern to query because database contain whitespace
    // like " AXISBANK  ", " LT" 

    NSE_COMPANIES.findOne({code : {$regex: pattern , $options: 'mi' }}).select('-_id -__v')
    .then((result) =>{

        if(result){

            res.status(201).json({
                statusCode : 200,
                data : result
            });
        }

        else{
            res.status(404).json({statusCode : 404, message : "Not found"})
        }
    })
    .catch((err)=>{
        res.status(404).json({statusCode : 500, message : 'error while fetching details'});
    });
}


const company_names = function(req, res, next){
    let name =  req.params.name.replace("%20", " ");
    // print(name);
    NSE_COMPANIES.find({name : {$regex :name, $options : 'i'}}).select('-_id -__v')
    .then( (result) => {
        // print(result);
        res.status(200).json({statusCode : "200", data : result });
    })
    .catch( (err) => {
        res.status(404).json({statusCode : "404", message : "error while fetching"});
    });
}

module.exports = { 
    company_details : company_details,
    company_names : company_names

}
