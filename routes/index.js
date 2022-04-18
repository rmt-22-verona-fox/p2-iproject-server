const router = require("express").Router();
const postRoutes = require("./postRoutes");
const threadRoutes = require("./threadRoutes");
const userRoutes = require("./userRoutes");

router.get("/register");

module.exports = router;
