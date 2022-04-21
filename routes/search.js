const express = require("express");
const mapController = require("../controllers/mapController");
const router = express.Router();

router.get("/:query", mapController.fetchSearchData);

module.exports = router;
