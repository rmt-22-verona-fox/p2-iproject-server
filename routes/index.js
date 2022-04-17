const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const packageRoutes = require("./packageRoutes");
const transactionRoutes = require("./transactionRoutes");

router.use("/user", authRoutes);
router.use("/packages", packageRoutes);
router.use("/profile", transactionRoutes);

module.exports = router;
