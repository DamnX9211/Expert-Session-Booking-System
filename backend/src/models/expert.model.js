const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    slots: [
        {
            type: String,
            required: true
        },
    ],
   
},
   {_id: false}
);

const expertSchema = new mongoose.Schema({
     name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    bio: {
      type: String,
      default: "",
    },
    availableSlots: [slotSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Expert', expertSchema);