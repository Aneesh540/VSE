"use strict";
const print = console.log;

const mongoose = require('mongoose');
const Trader = require('../models/users');
const Portfolio = require('../models/portfolio');

const _getPortfolio = async function (username) {
    
        let trader = await Trader.findOne({username : username}, '_id');
        let portfolio = await Portfolio.findOne({trader_ref : trader._id});
        return portfolio;
    
}

const _buyShare = async function(username, share_information){
    // add stock infomation to your portfolio
    let amount = share_information.buy_price * share_information.quantity;

    const trader = await Trader.findOne({username : username}, '_id');
    const portfolio = await Portfolio.findOne({trader_ref : trader._id});
    portfolio.demat_account.push(share_information);
    portfolio.total_buy = portfolio.total_buy + amount;
    await portfolio.save();

    // return new Error("this is a custom error");
    return portfolio;

}

const _sellShare = async function(username, share_information){

    const trader = await Trader.findOne({username : username}, '_id');
    const portfolio = await Portfolio.findOne({trader_ref : trader._id});

    print(portfolio.demat_account);
}


const show_demat_account = function(req, res, next){
    let username = req.params.username;

    let portfolio = _getPortfolio(username)
    .then( (result) => {
        print(result);
        let available_shares = result.demat_account.filter( (item) => {
            return item.sell_price === -1;
        });

        res.status(200).json({statusCode : 200, data : available_shares});

    })
    .catch( (err) => {

        res.status(500).json({statusCode : 404, error : `not able to fetch for ${username}`});
    });
    
}


const show_share_holding = function(req, res, next){
    /* share holding details of a particular share */
    const username = req.params.username;
    const code = req.params.NSE_code;
    let portfolio = _getPortfolio(username);

    portfolio
    .then( (account) =>{
        const share_holding = account.demat_account.filter( (stock) => {
            return (stock.nse_code === code && stock.sell_price === -1);
        });

        res.status(200).json({
           statusCode : 200,
           data : share_holding
        });
    })
    .catch( (error) => {
        res.status(404).json({statusCode : 404 , error : error});
    });

}


const sell_share = function(req, res, next){
    let username = req.params.username
    _sellShare(username, 123);
}


const buy_share = function(req, res, next){

    let share_inf = {   nse_code : req.body.code,
                        name : req.body.name,
                        quantity : parseFloat(req.body.quantity),
                        buy_price : parseFloat(req.body.price)
                    };
    

    _buyShare(req.params.username, share_inf)
        .then( result => {
            res.status(201).json({
                statusCode : 201,
                total_buy : result.total_buy,
                share_detail : share_inf
            });
        
        })
        .catch( error => {
            res.status(500).json({
                statusCode : 500,
                details : "cannot process request",
                error : error
            });
        });
}


module.exports = {
    show_demat_account, 
    show_share_holding,
    buy_share, 
    sell_share
}