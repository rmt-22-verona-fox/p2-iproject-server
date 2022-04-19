const express = require("express");
const user = express.Router();
const userController = require("../controller/user_controller");

user.post("/register", userController.register);


module.exports = user;
