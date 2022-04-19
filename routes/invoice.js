const express = require('express')
const router = express.Router()
const Controller = require('../controllers/invoice-controller')
router.get('/', Controller.listInvoice)
router.post('/add')

module.exports = router