const express = require('express')
const router = express.Router()
const users = require('./users')
const products = require('./products')
const invoice = require('./invoice')
const authentication = require('../middlewares/authentication')
const errorHandler = require('../middlewares/errorhandler')

router.use('/users', users)
router.use('/products', products)
router.use(authentication)
router.use('/invoice', invoice)
router.use(errorHandler)
module.exports = router