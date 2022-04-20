const router = require('express').Router();
const ControllerAuth = require('../controllers/authController')

router.post('/register', ControllerAuth.register)
router.post('/login', ControllerAuth.login)
module.exports = router