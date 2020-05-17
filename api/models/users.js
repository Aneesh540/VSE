"use strict";
const mongoose = require('mongoose');

const Trader = new mongoose.Schema({

    username : {type : String, required : true, unique : true},
    name : {type : String, default : 'New trader'},
    password : {type : String, required : true},
    email: {
        type: String,
        unique: true,
        required: true,
        match : /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    }

});

module.exports = mongoose.model('traders', Trader)
