const express = require("express");
const authentication = require("../middleware/authentication");
const router = express.Router();
const stock = require("./stock");
const user = require("./user");

router.use(authentication, stock);

router.use(user);

module.exports = router;
