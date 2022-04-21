const express = require("express");
const router = express.Router();

const Destination = require("../controller/destination-controller");

router.get("/", Destination.getAllDestination);
router.get("/:id", Destination.getDestinationById);

module.exports = router;
