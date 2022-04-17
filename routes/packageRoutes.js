const express = require("express");
const router = express.Router();
const PackageController = require("../controllers/PackageController");

router.get("/all", PackageController.index);
router.get("/promos", PackageController.promo);
router.get("/categories", PackageController.categories);
router.get("/testimonies", PackageController.testimonies);

module.exports = router;
