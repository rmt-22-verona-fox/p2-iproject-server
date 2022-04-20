const express = require("express");
const router = express.Router();

const routerRegister = require("./register");

router.use("/register", routerRegister);

module.exports = router;