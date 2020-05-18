const router = require('express').Router();
const controller = require('../controllers/index');
const mongoose = require('mongoose');
const middleware = require('../middleware/checkAuth');


try{
    mongoose.connect('mongodb://localhost:27017/virtualbroker', {useNewUrlParser:true,  useUnifiedTopology: true}, );
}

catch (e){
    console.log('No such database exist ');

}

// details of NSE listed companies
router.get('/NSE_code/:code', controller.company_details);
router.get('/NSE_name/:name', controller.company_names);


// user registration and login routes
router.post('/signup', controller.createuser);
router.post('/login', controller.login);
router.delete('/:username',middleware.check_auth, controller.deleteuser);


// user operation << long term trading >>
router.get('/:username', middleware.check_auth, controller.show_demat_account);
router.get('/:username/:NSE_code', middleware.check_auth, controller.show_share_holding);
router.post('/:username/buy', middleware.check_auth, controller.buy_share);
router.post('/:username/sell', middleware.check_auth, controller.sell_share);


// GET & POST REQUEST endpoint for testing purpose
router.get('/test', controller.get_test);
router.post('/test', controller.post_test);


module.exports = router;

// 409 -> conflit with given data
// 422 -> unprocessable entity
// 503 -> server not available
