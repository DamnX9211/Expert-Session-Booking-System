const express = require("express");
const router = express.Router();
const protect = require("../middlewares/auth.middleware");

const {
    createBooking,
    getMyBookings,
    updateBookingStatus,
} = require("../controllers/booking.controller");

router.post("/", protect, createBooking);
router.get("/me", protect, getMyBookings);
router.patch("/:id/status", protect, updateBookingStatus);

module.exports = router;