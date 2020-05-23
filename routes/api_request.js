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
// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikd1cnUiLCJlbWFpbCI6Ikd1cnVAZW1haWwuY29tIiwiaWF0IjoxNTg5OTY4MzYwLCJleHAiOjE1OTExNzc5NjB9.hmovr4LZv39KLE8uegtQW2ftTZd3kO_6BMoLxTh37YU'

// get_request('http://localhost:3000/api/Guru', token)
// .then( result => print(result))
// .catch( err => print(err));

// let cred = {id : 'eren',  password : '12345'}

// post_request('http://localhost:3000/api/login', cred)
// .then( ans => print(ans))
// .catch(err => print(err));
