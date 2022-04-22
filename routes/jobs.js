const express = require("express");
const router = express.Router();

const ControllerJobs = require("../controllers/controllerJobs");

router.get("/", ControllerJobs.allJobs);

module.exports = router;
