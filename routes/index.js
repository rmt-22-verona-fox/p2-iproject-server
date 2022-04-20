const express = require('express');
const router = express.Router();
const apiNews = require('./apinews');
const apiCrypto = require('./apicrypto');

router.get('/', (req, res) => {
  res.send('Hello World!');
})

router.use('/api/news', apiNews);
router.use('/api/crypto', apiCrypto);

module.exports = router