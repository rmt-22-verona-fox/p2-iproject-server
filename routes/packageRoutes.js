const express = require("express");
const router = express.Router();
const PackageController = require("../controllers/PackageController");

router.get("/all", PackageController.index);
router.get("/promos", PackageController.promo);

module.exports = router;
