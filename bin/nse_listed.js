"use strict";
const print = console.log;
const csvFilePath='./equity.csv'
const csv=require('csvtojson')
const mongoose = require('mongoose');

const NSE_COMPANIES = new mongoose.Schema({
    code: {type : String, required : true, unique : true} ,
    name:  {type : String, required : true} ,
    series: {type : String} ,
    date_of_listing:  {type : String},
    paid_up_value:  {type : String},
    market_lot: {type : String} ,
    ISIN_number: {type : String, unique : true} ,
    face_value: {type : String} 
});

const NSE_Model = mongoose.model('nse_listed', NSE_COMPANIES);


const load_companies =  function(){
    try{
        const uri = "mongodb+srv://virtualbroker:Aneesh540@vse-irzi4.mongodb.net/test?retryWrites=true&w=majority"
        mongoose.connect(uri, {useNewUrlParser:true,  useUnifiedTopology: true}, function(){
            print('conneted to databse');
        });

        csv()
        .fromFile(csvFilePath)
        .then(function(result){
            // print(result);
        
            NSE_Model.insertMany(result);
            // print(result.length);
            // print('all companies inserted to database')
            // process.exit();
        })
        // .then( () => {print('done !!!!! enjoy');})
        // .then( () => setTimeout(()=> print("inside setTimeout"), 5000) )
        // .then( () => {print('done !!!!! 2 ');})
        // .then(() => {process.exit();})
        .catch(err => {print(err);});
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