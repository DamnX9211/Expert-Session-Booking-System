const express = require("express");
const router = express.Router();
const protect = require("../middlewares/auth.middleware");
const allowRoles = require("../middlewares/role.middleware");
const {
  getExperts,
  getAllBookings,
  cancelBookings,
  approveExpert,
  rejectExpert,
} = require("../controllers/admin.controller");

router.use(protect, allowRoles("admin"));


router.get("/experts", getExperts);
router.get("/bookings", getAllBookings);
router.patch("/bookings/:id/cancel", cancelBookings);
router.patch("/experts/:id/approve", approveExpert);
router.patch("/experts/:id/reject", rejectExpert);


module.exports = router;