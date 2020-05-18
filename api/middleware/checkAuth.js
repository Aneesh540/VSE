"use strict";
const print = console.log;
const PK = 'VIRTUALSTOCKEXCHANGE';
const jwt = require('jsonwebtoken');

const auth_failed = {
    statusCode : 401,
    message : "Authorization failed"
}

const check_auth = function(req, res, next){
    let jwt_token = req.headers.authorization;
    print(jwt_token)
    if(jwt_token === undefined){
        print('inside this also')
        auth_failed.details = 'No jtw token specified'
        res.status(401).json(auth_failed);
    }
    
    jwt_token = jwt_token.split(" ")[1];

    jwt.verify(jwt_token, PK, function(err, token){
        print(token);
        print(req.params.username);
        if(req.params.username === token.username){
            
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