"use strict";
const print = console.log;
const PK = 'VIRTUALSTOCKEXCHANGE';
const jwt = require('jsonwebtoken');

const auth_failed = {
    statusCode : 401,
    message : "Authorization failed possible errors wrong username, check URL, login first, corrupt token"
}

const check_auth = function(req, res, next){
    let jwt_token = req.headers.authorization;

    if(jwt_token === undefined){
        auth_failed.details = 'No jtw token specified, login first'
        res.status(401).json(auth_failed);
        return
    }
    
    
    jwt_token = jwt_token.split(" ")[1];
    
    jwt.verify(jwt_token, PK, function(err, token){

        if(token && (req.params.username === token.username)){
            next();
        }
        

        else{ 
            
            res.status(401).json(auth_failed);
        
        }
        
    });

    
}

module.exports = {
    check_auth : check_auth
}