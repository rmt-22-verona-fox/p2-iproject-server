"use strict";
const router = require("express").Router();
const User = require("../controllers/userController");
const myPokemons = require("./myPokemons");
const { authenticate } = require("../middlewares/authentication");

router.post("/register", User.register);
router.post("/login", User.login);
router.post("/googleLogin", User.googleLogin);

router.use(authenticate);

router.use("/mypokemons", myPokemons);

module.exports = router;
