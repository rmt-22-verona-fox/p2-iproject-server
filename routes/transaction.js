let express = require('express');
let router = express.Router();
const Controller = require('../controllers/index');
router.post('/', Controller.transaction);
module.exports = router;
