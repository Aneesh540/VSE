const router = require('express').Router();
const controller = require('../controllers/index');
const mongoose = require('mongoose');


try{
    mongoose.connect('mongodb://localhost:27017/virtualbroker', {useNewUrlParser:true,  useUnifiedTopology: true}, );
}

catch (e){
    console.log('No such database exist ');

}


router.get('/', controller.getuser);
router.post('/', controller.createuser);
router.post('/:username/buy_share', controller.buy_share);
router.get('/NSE/:code', controller.company_details);
module.exports = router;

// 409 -> conflit with given data
// 422 -> unprocessable entity
// 503 -> 