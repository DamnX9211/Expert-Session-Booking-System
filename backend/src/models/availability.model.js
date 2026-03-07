const mongoose = require('mongoose');

const availabilitySchema = new mongoose.Schema({
    expert: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Expert',
        required: true,
    },
    dayOfWeek: {
        type: Number,
        required: true
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
    slotDuration: {
        type: Number,
        default: 30
    }
});

module.exports = mongoose.model('Availability', availabilitySchema);