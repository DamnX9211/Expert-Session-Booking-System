const asyncHandler = require("../middlewares/asyncHandler");
const User = require("../models/user.model");
const Booking = require("../models/booking.model");

// Approve expert by admin
exports.approveExpert = asyncHandler(async (req, res) => {
  const expert = await User.findById(req.params.id);

  if (!expert) {
    return res.status(404).json({ message: "Expert not found" });
  }

  expert.status = "approved";
  await expert.save();

  res.status(200).json({ message: "Expert approved successfully" });
});

// Reject expert by admin
exports.rejectExpert = asyncHandler(async(req, res) => {
  const expert = await User.findById(req.params.id)
  if (!expert) {
    return res.status(404).json({ message: "Expert not found" });
  }
  expert.status = "rejected";
  await expert.save();
  res.status(200).json({ message: "Expert rejected successfully" });
})

// get experts list
exports.getExperts = asyncHandler(async (req, res) => {
  const experts = await User.find({
    role: "expert",
    status: "pending",
  });
  res.json(experts);
});

// get all bookings for admin
exports.getAllBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find()
    .populate("user", "name email")
    .populate("expert", "name email")
    .sort({ createdAt: -1 });
  res.json(bookings);
});

// cancel booking by admin
exports.cancelBookings = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }
  booking.status = "cancelled";
  await booking.save();
  res.status(200).json({ message: "Booking cancelled successfully" });
});
