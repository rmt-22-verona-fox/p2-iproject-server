const express = require("express");
const router = express.Router();
const Authentication = require("../middleware/authentication");

const Destination = require("../controller/destination-controller");

router.use(Authentication.user);
router.get("/", Destination.getAllDestination);

module.exports = router;
