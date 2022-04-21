let express = require('express');
let router = express.Router();
const users = require('./users');
const soldItems = require('./items');
const transaction = require('./transaction');
const contributor = require('./contributor');
const category = require('./category');

// router.get('/', Controller.showHome);

router.use('/user', users);
router.use('/item', soldItems);
router.use('/transaction', transaction);
router.use('/contributor', contributor);
router.use('/category', category);

module.exports = router;
