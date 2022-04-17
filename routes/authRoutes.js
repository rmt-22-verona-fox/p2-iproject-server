const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");
const requireLogin = require("../middlewares/requireLogin");

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/verify", requireLogin, AuthController.verify);

module.exports = router;
