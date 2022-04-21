const express = require('express')
const router = express.Router()
const Controller = require('../controllers/invoice-controller')
router.get('/', Controller.listInvoice)
router.post('/add', Controller.createInvoice)

module.exports = router