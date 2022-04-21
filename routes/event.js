const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");

router.get("/home-page", eventController.homePage);
router.get("/list", eventController.list);
router.patch("/patch-hands/:EventId", eventController.patchHands);

module.exports = router;
