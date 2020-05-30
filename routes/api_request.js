"use strict";
const print = console.log;
const axios = require('axios');

let get_request = async (url, token = 'NOT_GIVEN') =>{

    let HEADERS = { "Content-Type" : "application/json" }
    
    if(token !== 'NOT_GIVEN'){
        HEADERS = { "Content-Type" : "application/json" , 
                    'Authorization' : `Bearer ${token}`}
    }


    let result = await axios.create({
        method : 'get',

        headers : HEADERS,
        
        validateStatus : (status) => status < 510
           
    })
    .get(url);

    // print(Object.keys(result));
    
    return result.data;


    
}

let post_request = async (url, data, token = 'NOT_GIVEN') => {

    let HEADERS = { "Content-Type" : "application/json" }
    
    if(token !== 'NOT_GIVEN'){
        HEADERS = { "Content-Type" : "application/json" , 
                    'Authorization' : `Bearer ${token}`}
    }

    let result = await axios.create({
        method : 'post',
        headers : HEADERS,
        validateStatus : (status) => status < 500
    })
    .post(url, data);
    // print(Object.keys(result));
    
    return result.data;
}

module.exports = {
    get_request,
    post_request
}
