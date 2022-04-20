const express = require("express");
const router = express.Router();

const routerRegister = require("./register");
const routerLogin = require("./login");
const { authenticationUser } = require("../middlewares/authentication")

router.use("/register", routerRegister);
router.use("/login", routerLogin);
router.use(authenticationUser)

module.exports = router;