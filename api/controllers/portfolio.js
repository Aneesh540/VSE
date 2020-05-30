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

const _sellShare = async function(username, sell_list){

    if(sell_list.length === undefined){
        throw Error('array is required instead of object');
    }

    const trader = await Trader.findOne({username : username}, '_id');
    const portfolio = await Portfolio.findOne({trader_ref : trader._id});

    // print(portfolio.demat_account);
    let account = portfolio.demat_account;
    let total = 0;

    for(let i=0; i<sell_list.length; ++i){
        
        const stock_id = sell_list[i].id;
        const quantity = parseInt(sell_list[i].quantity);
        const sell_price = parseInt(sell_list[i].price);

        

        let stock = await account.find( (stock) => stock._id.toString() === stock_id);

        if(stock){
                    if (stock.quantity >= quantity){
                    stock.quantity -= quantity;
                    stock.sell_date = new Date;
                    total += quantity*sell_price;

                    }
        }

    }

    portfolio.total_sell += total;

    await portfolio.save();

    return {statusCode : 200, 
                data : {credit_amount : total, 
                        buy : portfolio.total_buy,
                        sell : portfolio.total_sell }
    };
    
}


const show_demat_account = function(req, res, next){
    let username = req.params.username;

    let portfolio = _getPortfolio(username)
    .then( (result) => {

        let available_shares = result.demat_account.filter( (item) => {
            return item.quantity > 0;
        });


        res.status(200).json({
            statusCode : 200, 
            data : {
                
                total_buy : result.total_buy,
                total_sell : result.total_sell,
                available : available_shares

                    }
        });

    })
    .catch( (err) => {

        res.status(500).json({statusCode : 404, error : `not able to fetch for ${username}`});
    });
    
}


const show_share_holding = function(req, res, next){
    /* share holding details of a particular share */
    
    const username = req.params.username;
    const code = req.params.NSE_code.toUpperCase();
    let portfolio = _getPortfolio(username);

    portfolio
    .then( (account) =>{
        const share_holding = account.demat_account.filter( (stock) => {
            return (stock.nse_code === code && stock.quantity > 0);
        });

        let statusCode = 200;
        if(share_holding.length === 0){
            statusCode = 404;
        }

        res.status(200).json({
           statusCode : statusCode,
           data : share_holding
        });
    })
    .catch( (error) => {
        res.status(404).json({statusCode : 404 , error : error});
    });

}


const sell_share = function(req, res, next){
    let username = req.params.username;
    let sell_list = req.body;


    _sellShare(username, sell_list)
    .then( (result) => {
        res.status(200).json(result);
    })
    .catch( error => {
        let details = 'a list is requied instead of array or quantity >= available quantity'
        res.status(400).json({statusCode : 400,  error : details });
    });
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
                data : {total_buy : result.total_buy,
                        total_sell : result.total_sell,
                        share_detail : share_inf}
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