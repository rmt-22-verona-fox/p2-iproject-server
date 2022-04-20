const express = require("express");
const router = express.Router();

const AuthenticationUser = require("../controllers/authenticationUser");

router.post("/", AuthenticationUser.userRegister);

module.exports = router;