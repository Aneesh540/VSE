"use strict";

const mongoose = require('mongoose');

try{
    mongoose.connect('mongodb://localhost:27017/virtualbroker', {useNewUrlParser:true}, );
}

catch (e){
    console.log('No such database exist ');

}

const Trader = new mongoose.Schema({

    username : {type : String, required : true, unique : true},
    name : {type : String, default : 'New trader'},
    profitloss : {type : Number, default : 0},
    email: {
        type: String,
        unique: true,
        required: true

    }

}, {collation : 'traders'});

module.exports = mongoose.model('traders', Trader)
