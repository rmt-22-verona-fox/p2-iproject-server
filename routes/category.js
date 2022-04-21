let express = require('express');
let router = express.Router();
const Controller = require('../controllers/index');

router.get('/', Controller.showAllCategories);
router.post('/', Controller.addCategories);
module.exports = router;
