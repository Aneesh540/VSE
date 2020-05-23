"use strict";
const print = console.log;
const PK = "VIRTUALSTOCKEXCHANGE"

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Trader = require('../models/users');
const Portfolio = require('../models/portfolio');

const getuser = async function(req, res, next){
    let username_email = req.body.id;
    let password = req.body.password;
    print(req.body);
    
    let user = await Trader.findOne({username : username_email});

    if(!user){
        user = await Trader.findOne({email : username_email});
    }

    if(!user){
        res.status(404).json({statusCode: 404, message : `incorrect username/email >> "${username_email}"` });
    }

    else{

        bcrypt.compare(password, user.password, function(err, result){
            if(result){
                jwt.sign({username : user.username, email : user.email}, PK, {expiresIn : "14d"}, (error, token) =>{

                    if(error) {
                        res.status(500).json({
                            statusCode : 500, 
                            message : "error generating json web token"
                        });
                    }
                    
                    res.status(200).json({statusCode : 200, username : user.username,  message : "Auth success", token : token});
                });
                
            }

            else{
                res.status(404).json({statusCode : 404, message : "Auth failed, incorrect password"});
            }
        });
    }


}


const createuser = async function(req, res, next){
    const saltRounds = 10;
    let hash = await bcrypt.hash(req.body.password, 10);
    
    const newtrader = new Trader({
        name : req.body.name, 
        username : req.body.username, 
        email : req.body.email,
        password : hash
    
    });

    newtrader
            .save() // save gives a real promise , normal queries given exec method to turn them into real promise for then catch 
            .then( (result) =>{

                const newportfolio = new Portfolio({
                    trader_ref : result._id
                });

                newportfolio.save();

                res.status(201).json({
                    statusCode : 201,
                    data : {
                        message : 'new user created with a demat account',
                        details : {     name : result.name, 
                                        username : result.username, 
                                        email : result.email }
                        }
                });
            })
            .catch( err => {

                res.status(403).json({
                    message : 'maybe user already exist',
                    details : err
                });

            });
        

}


const deleteuser = async function(req, res, next){
    const username = req.params.username;
    let user = await Trader.findOne({username : username});
    if(user === null){
        res.status(404).json({statusCode : 404, message : 'user not found'});
    }
    const userid = user._id;

    Trader.deleteOne({_id :userid}, function(err, result){
        if(err) {
            res.status(500).json(
                {statusCode : 500, message : 'internal server error while deleting user'
            });
        }

    });

    Portfolio.deleteOne({trader_ref : userid} , function(err, result){
        if(err) {
            res.status(500).json(
                {statusCode : 500, message : 'internal server error while deleting user'
            });
        }

        
    });

    res.status(200).json({statusCode : 200, message : `User '${username}' deleted`});
    

}

module.exports = {
   getuser : getuser,
   createuser : createuser,
   deleteuser : deleteuser
}

