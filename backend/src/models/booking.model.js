const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    expert: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Expert",
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    timeSlot: {
        type: String,
        required: true,
    },
    notes: {
        type: String,
        default: "",
    
    },
    status: {
        type: String,
        enum: ["pending", "confirmed", "completed"],
        default: "pending",
    }
},
 { timestamps: true }
);

// Unique index to prevent double booking
bookingSchema.index(
    { expert: 1, date: 1, timeSlot: 1},
    { unique: true }
);

module.exports = mongoose.model("Booking", bookingSchema)