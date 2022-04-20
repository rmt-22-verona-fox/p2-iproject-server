const express = require("express");
const router = express.Router();

const routerRegister = require("./register");
const routerLogin = require("./login");

router.use("/register", routerRegister);
router.use("/login", routerLogin);

module.exports = router;