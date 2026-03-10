import { approveExpert, cancelBookings, getAllBookings, getExperts } from "../controllers/admin.controller";

const express = require("express");
const router = express.Router();
const protect = require("../middlewares/auth.middleware");
const allowRoles = require("../middlewares/role.middleware");

router.use(protect, allowRoles("admin"));


router.get("/experts", getExperts);
router.get("/bookings", getAllBookings);
router.patch("/bookings/:id/cancel", cancelBookings);
router.patch("/experts/:id/approve", approveExpert);

module.exports = router;