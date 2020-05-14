"use strict";
const print = console.log;

const Trader = require('../models/users');
const Portfolio = require('../models/portfolio');

const getuser = function(req, res, next){
    console.log(req.body);
    res.status(200).json({message : 'badme dekhene'});
}


const createuser = function(req, res, next){
    // print(req.body);
    
    const newtrader = new Trader({
        name : req.body.name, 
        username : req.body.username, 
        email : req.body.email,
        password : req.body.password
    
    });

    newtrader
            .save() // save gives a real promise , normal queries given exec method to turn them into real promise for then catch 
            .then( (result) =>{

                const newportfolio = new Portfolio({
                    trader_ref : result._id
                })

                newportfolio.save();

                res.status(201).json({
                    msg : "new user created with demat account",
                    detail : result
                })
            

            }).catch( err => {

                res.status(500).json({
                    message : 'error creating user',
                    details : err
                });

            });
 

}

module.exports = {
   getuser : getuser,
   createuser : createuser
}

