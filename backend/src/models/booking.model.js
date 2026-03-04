const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    expert: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Expert",
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
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
        enum: ["pending", "confirmed", "cancelled"],
        default: "pending",
    }
},
 { timestamps: true }
);

bookingSchema.index(
    { expert: 1, date: 1, timeSlot: 1},
    { unique: true }
);

module.exports = mongoose.model("Booking", bookingSchema)