let express = require('express');
let router = express.Router();
// const Controller = require('../controllers/index');
const Controller = require('../controllers/userController');

router.get('/', Controller.showAllUser);
router.post('/register', Controller.registerNewUser);
router.post('/login', Controller.login);

module.exports = router;
