const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const authentication = require("../middlewares/authentication");

router.get("/home-page", eventController.homePage);
router.get("/list", eventController.list);
router.patch(
  "/patch-hands/:EventId",
  authentication,
  eventController.patchHands
);

module.exports = router;
