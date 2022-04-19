const express = require('express')
const router = express.Router()
const Controller = require('../controllers/users-controller')


router.post('/register', Controller.registerHandler)
router.post('/login', Controller.loginHandler)


module.exports = router