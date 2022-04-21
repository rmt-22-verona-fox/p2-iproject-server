const express = require("express");
const router = express.Router();

const Authentication = require("../middleware/authentication");
const Booking = require("../controller/booking-controller");

router.use(Authentication.user);
router.post("/", Booking.bookingCreate);
router.get("/:number", Booking.getBookingByNumber);

module.exports = router;
