"use strict";
const print = console.log;
const csvFilePath='./nse_listed.csv'
const csv=require('csvtojson')
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

const NSE_Model = mongoose.model('NSE_listed', NSE_COMPANIES);


const load_companies = async function(){
    try{
        await mongoose.connect('mongodb://localhost:27017/virtualbroker', {useNewUrlParser:true,  useUnifiedTopology: true}, function(){
            print('conneted to databse');
        });

        await csv()
        .fromFile(csvFilePath)
        .then(function(result){
        
            NSE_Model.insertMany(result);
            // print(result.length);
            // print('all companies inserted to database')
            // process.exit();
        });
    }

    catch (e){
        console.log(e);
        process.exit();

    }

}

load_companies();


// csv()
// .fromFile(csvFilePath)
// .then(function(result){

//     // print(result);
//     print(result.length);
// });