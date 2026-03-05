const express = require("express");
const router = express.Router();

const {
    createBooking,
    getBookingsByEmail,
    updateBookingStatus,
} = require("../controllers/booking.controller");

router.post("/", createBooking);
router.get("/", getBookingsByEmail);
router.patch("/:id/status", updateBookingStatus);

module.exports = router;