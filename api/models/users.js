"use strict";

const mongoose = require('mongoose');

try{
    mongoose.connect('mongodb://localhost:27017/virtualbroker', {useNewUrlParser:true,  useUnifiedTopology: true}, );
}

catch (e){
    console.log('No such database exist ');

}

const Trader = new mongoose.Schema({

    username : {type : String, required : true, unique : true},
    name : {type : String, default : 'New trader'},
    email: {
        type: String,
        unique: true,
        required: true
    }

});

module.exports = mongoose.model('traders', Trader)
