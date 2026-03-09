const express = require("express");
const router = express.Router();
const protect = require("../middlewares/auth.middleware");
const allowRoles = require("../middlewares/role.middleware");
const {
  createAvailability,
  getAvailability,
  deleteAvailability,
  getExpertBookings,
  updateBookingStatus,
} = require("../controllers/expert.dashboard.controller");

router.use(protect, allowRoles("expert"));

router.post("/availability", createAvailability);
router.get("/availability", getAvailability);
router.delete("/availability/:id", deleteAvailability);
router.get("/bookings", getExpertBookings);
router.patch("/bookings/:id/status", updateBookingStatus);

module.exports = router;
