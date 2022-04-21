const express = require("express");
const router = express.Router();
const PackageController = require("../controllers/PackageController");
const requireLogin = require("../middlewares/requireLogin");

router.get("/all", PackageController.index);
router.get("/promos", PackageController.promo);
router.get("/categories", PackageController.categories);
router.get("/testimonies", PackageController.testimonies);
router.post("/testimonies", requireLogin, PackageController.store);
router.get("/:id", PackageController.show);

module.exports = router;
