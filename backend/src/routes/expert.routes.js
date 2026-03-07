const express = require("express");
const router = express.Router();
const {
  getExperts,
  getExpertById,
  getAvailableSlots
} = require("../controllers/expert.controller");

router.get("/", getExperts);
router.get("/:id", getExpertById);
router.get("/:id/available-slots", getAvailableSlots);

module.exports = router;
