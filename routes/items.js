let express = require('express');
let router = express.Router();
const Controller = require('../controllers/itemController');

router.get('/', Controller.showAllItem);
router.post('/addnew', Controller.postNewItem);
router.get('/:id', Controller.showItemDetail);
router.delete('/:id', Controller.deleteItemById);

module.exports = router;
