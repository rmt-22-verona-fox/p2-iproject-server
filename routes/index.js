const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const packageRoutes = require("./packageRoutes");

router.use("/user", authRoutes);
router.use("/packages", packageRoutes);

module.exports = router;
