const asyncHandler = require("../middlewares/asyncHandler");
const Booking = require("../models/booking.model");
const Expert = require("../models/expert.model");
const mongoose = require("mongoose");
const { acquireSlotLock, releaseSlotLock } = require("../utils/slotLock");

// Bookings
exports.createBooking = asyncHandler(async (req, res) => {
  const { expertId, phone, date, timeSlot, notes } = req.body;

  const userId = req.user._id;

  const locked = await acquireSlotLock(expertId, date, timeSlot);

  if(!locked) {
    return res.status(400).json({ message: "Slot is being booked by another user" });
  }

  // Validate input
  if (!expertId || !phone || !date || !timeSlot) {
    return res.status(400).json({ message: "All fields are required" });
  }
  // //   // Validate expert
  if (!mongoose.Types.ObjectId.isValid(expertId)) {
    return res.status(400).json({ message: "Invalid expert ID" });
  }
  const expert = await Expert.findById(expertId);

  if (!expert) {
    return res.status(404).json({ message: "Expert not found" });
  }
  // Checking for existing booking
  const existingbooking = await Booking.findOne({
    expert: expertId,
    date,
    timeSlot,
  });

  if (existingbooking) {
    return res.status(400).json({ message: "Time slot already booked" });
  }
  // Creating booking
  try {
    const booking = await Booking.create({
      user: userId,
      expert: expertId,
      phone,
      date,
      timeSlot,
      notes
    });
    // Emit real-time update
    const io = req.app.get("io");
    io.to(`expert_${expertId}`).emit("slotBooked", {
      expertId,
      date,
      timeSlot
    });

    res.status(201).json({
      message: "Booking created successfully",
      booking
    });
  } catch (error) {
    // Duplicate slot booking
    if (error.code === 11000) {
      return res.status(400).json({ message: "slot already booked" });
    }
    throw error;
  } finally {
     await releaseSlotLock(expertId, date, timeSlot);
  }
});


// // Get bookings for an expert by ID
exports.updateBookingStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  if (!["pending", "confirmed", "completed"].includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }

  booking.status = status;
  await booking.save();
  res.json({ message: "Booking status updated", booking });
});

// Get bookings for logged in user
exports.getMyBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({
    user: req.user._id
  })
  .populate("expert", "name category")
  .sort({ createdAt: -1 });

  res.json({ bookings });
})
