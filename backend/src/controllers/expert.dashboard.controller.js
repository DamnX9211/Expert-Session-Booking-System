const asyncHandler = require("../middlewares/asyncHandler");
const Expert = require("../models/expert.model")
const Availability = require("../models/availability.model");
const Booking = require("../models/booking.model");

// Create availability for the logged-in expert
exports.createAvailability = asyncHandler(async(req, res) => {
    const { dayOfWeek, startTime, endTime,slotDuration } = req.body;

    const availability = await Availability.create({
        expert: req.user._id,
        dayOfWeek,
        startTime,
        endTime,
        slotDuration

    })
    res.status(201).json({ message: "Availability created", availability });
})

// Get availability for the logged-in expert
exports.getAvailability = asyncHandler(async(req, res) => {
    const availability = await Availability.find({
        expert: req.user._id
    });
    res.status(200).json(availability);
})


// Delete availability for the logged-in expert
exports.deleteAvailability = asyncHandler(async(req, res) => {
    const { id } = req.params;
    await Availability.findByIdAndDelete(id);
    res.status(200).json({ message: "Availability removed" });
});

// Get bookings for the logged-in expert
exports.getExpertBookings = asyncHandler(async(req, res) =>{
    const bookings = await Booking.find({
        expert: req.user._id
    }).populate("user", "name email")
    .sort({ date: 1 });

    res.status(200).json(bookings)
})

// Update booking status (e.g., accept, reject) for the logged-in expert
exports.updateBookingStatus = asyncHandler(async(req, res) => {
    const { status } = req.body;

    const booking = await Booking.findOne({
        _id: req.params.id,
        expert: req.user._id
    });

    if(!booking) {
        return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = status;
    await booking.save();
    res.status(200).json(booking)

})