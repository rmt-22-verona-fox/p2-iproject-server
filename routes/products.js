const express = require('express')
const router = express.Router()
const Controller = require('../controllers/products-controller')

router.get('/sneakers', Controller.listSneakers)
router.get('/sneakers/:id', Controller.sneakersDetail)
router.get('/brands', Controller.listBrands)

module.exports = router