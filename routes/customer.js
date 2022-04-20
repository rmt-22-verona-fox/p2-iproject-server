const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerCOntroller");

router.post("/register", customerController.register);
router.post("/login", customerController.login);

module.exports = router;
