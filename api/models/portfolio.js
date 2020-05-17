const mongoose = require('mongoose');

const Stock = new mongoose.Schema({

    name : {type : String, required : true}, 
    nse_code : {type : String, required : true},
    quantity : {type : Number, default : 1, min : [0, "less amount of share than selling quantity"]},

    buy_price : {type : Number, required : true},
    sell_price : {type : Number, default : -1},

    buy_date : {type : Date, default : Date.now},
    sell_date : {type : Date}
    
})

const Portfolio = new mongoose.Schema({

    trader_ref : {type : mongoose.Schema.Types.ObjectId, required : true, ref : 'traders'},
    total_buy : {type : Number, default : 0},
    total_sell : {type : Number, default : 0},

    demat_account : [Stock]

});

module.exports = mongoose.model('portfolio', Portfolio);
