const router = require('express').Router();
const controller = require('../controllers/index');


router.get('/', controller.getuser);
router.post('/', controller.createuser);
module.exports = router;
