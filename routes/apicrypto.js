const express = require('express');
const router = express.Router();
const apiCryptoController = require('../controllers/apicryptocontroller');

router.get('/', apiCryptoController.fetchCrypto);

module.exports = router;