const express = require("express");
const router = express.Router();

const ControllerMyApplications = require("../controllers/controllerMyApplications");
const {
  authorization,
  duplicateApplication,
  limitTotalApplication,
} = require("../middlewares/authorization");

router.post(
  "/",
  duplicateApplication,
  limitTotalApplication,
  ControllerMyApplications.addMyApplication
);
router.get("/", ControllerMyApplications.allMyApplications);
router.delete(
  "/:id",
  authorization,
  ControllerMyApplications.deleteMyApplication
);
router.patch(
  "/:id",
  authorization,
  ControllerMyApplications.updateStatusMyApplication
);

module.exports = router;
