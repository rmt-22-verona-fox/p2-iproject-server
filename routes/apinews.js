const express = require('express');
const router = express.Router();
const apiNewsController = require('../controllers/apinewscontroller');

router.get('/', apiNewsController.fetchNews)

module.exports = router