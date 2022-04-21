const express = require("express");
const router = express.Router();

const User = require("../controller/user-controller");

router.post("/login", User.login);
router.post("/register", User.register);

module.exports = router;
