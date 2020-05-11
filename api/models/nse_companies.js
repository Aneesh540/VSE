const mongoose = require('mongoose');

const NSE_COMPANIES = new mongoose.Schema({
    code: {type : String, required : true, unique : true} ,
    name:  {type : String, required : true, unique : true} ,
    series: {type : String} ,
    date_of_listing:  {type : String},
    paid_up_value:  {type : String},
    market_lot: {type : String} ,
    ISIN_number: {type : String, unique : true} ,
    face_value: {type : String} 
});

module.exports = mongoose.model('nse_listeds', NSE_COMPANIES);