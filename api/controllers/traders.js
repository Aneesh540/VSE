"use strict";
const print = console.log;

const Trader = require('../models/users');
const Portfolio = require('../models/portfolio');

const getuser = function(req, res, next){
    console.log(req.body);
}

const _buyShare = async function(username, share_information){
    // add stock infomation to your portfolio
    print(username);
    print(share_information);

    const trader = await Trader.findOne({username : username}, '_id');
    const portfolio = await Portfolio.findOne({trader_ref : trader._id})

    portfolio.demat_account.push(share_information);
    await portfolio.save();

    // return new Error("this is a custom error");
    return portfolio;

}

const buy_share = function(req, res, next){

    let share_inf = req.body;


    _buyShare(req.params.username, share_inf)
        .then( result => {
            res.status(201).json({message : 'share added to your portfolio', detail : result});
        })
        .catch( error => {
            print('error code 1233455');
            next(error);
        });
}

const createuser = function(req, res, next){
    // print(req.body);
    
    const newtrader = new Trader({
        name : req.body.name, 
        username : req.body.username, 
        email : req.body.email});

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
                    details : err.errmsg
                });

            });
 

}

module.exports = {
   getuser : getuser,
   createuser : createuser,
   buy_share : buy_share
}

