const express = require("express");
const router = express.Router();
const TransactionController = require("../controllers/TransactionController");
const requireLogin = require("../middlewares/requireLogin");
const requireVerification = require("../middlewares/requireVerification");

router.get("/", requireLogin, TransactionController.profile);
router.post(
  "/checkout",
  requireLogin,
  requireVerification,
  TransactionController.checkout
);

/* NEED FRONT END INTEGRATION */
router.post(
  "/payment",
  requireLogin,
  requireVerification,
  TransactionController.payment
);

module.exports = router;
