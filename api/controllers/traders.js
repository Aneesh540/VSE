const Trader = require('../models/users');

const getuser = function(req, res, next){
    res.status(200).json({msg : 'ok abc chekc'});
}

const createuser = function(req, res, next){
    
    

        console.log(req.body);
        let newuser =  new Trader({name : req.name, username : req.username, email : req.email});
        newuser.save().then(
        res.status(201).json({msg : 'new user created', username : req.username}));




}

module.exports = {
   getuser : getuser,
   createuser : createuser
}

