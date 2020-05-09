const router = require('express').Router();
const controller = require('../controllers/index');


router.get('/', controller.getuser);
router.post('/', controller.createuser);
router.post('/:username/buy_share', controller.buy_share);
module.exports = router;
