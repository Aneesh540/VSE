const Trader = require('../models/users');
const Portfolio = require('../models/portfolio');

const getuser = function(req, res, next){
    console.log(req.body);
}

const _create_portfolio = function(trader_details){

    const newportfolio = new Portfolio({
        
    })
}

const createuser = function(req, res, next){
    
    const newtrader = new Trader({
        name : req.body.name, 
        username : req.body.username, 
        email : req.body.email});

    newtrader
            .save() // save gives a real promise , normal queries given exec method to turn them into real promise for then catch 
            .then( (result) =>{

                const newportfolio = new Portfolio({
                    trader_ref : result._id
                })

                newportfolio.save();

                res.status(201).json({
                    msg : "new user created with demat account",
                    detail : result
                })
            

            }).catch( err => {

                res.status(500).json({
                    message : 'error creating user',
                    details : err.errmsg
                });

            });


    

}

module.exports = {
   getuser : getuser,
   createuser : createuser
}

