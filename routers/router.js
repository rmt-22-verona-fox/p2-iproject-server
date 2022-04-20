"use strict";

const express = require("express");
const Controller = require("../controllers/controller");

const router = express.Router();

router.get("/getChart", Controller.getChart);
router.get("/getTopArtist", Controller.getTopArtist);

module.exports = router;
