const express = require("express");
const user = express.Router();
const userController = require("../controller/user_controller");
const authentication = require("../middleware/authentication");

user.post("/register", userController.register);
user.post("/login", userController.login);
user.get("/profile", authentication, userController.profile);

module.exports = user;
