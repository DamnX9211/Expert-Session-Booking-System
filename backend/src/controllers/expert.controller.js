const asyncHandler = require('../middlewares/asyncHandler');
const Expert = require('../models/expert.model');
const Booking = require("../models/booking.model");
const generateSlots = require('../utils/generateSlots');
const Availability = require('../models/availability.model');


// @desc    Get all experts
exports.getExperts = asyncHandler(async (req, res) => {
    const { page =1, limit =6, search = "", category } = req.query;

    const query = {};
    if(search){
        query.name = { $regex: search, $options: "i"};

    }
    if (category){
        query.category = category;
    }

    const skip = (page-1)*limit;

    const experts = await Expert.find(query)
        .skip(skip)
        .limit(Number(limit))
        .sort({ createdAt: -1 });

        const total = await Expert.countDocuments(query);

        res.json({
            data: experts,
            pagination: {
                total,
                page: Number(page),
                pages: Math.ceil(total/limit),
            }
        })
})

// @desc    Get single expert

exports.getExpertById = asyncHandler(async (req, res) => {
    const expert = await Expert.findById(req.params.id);

    if (!expert){
        return res.status(404).json({ message: "Expert not found"});
    }
    res.json(expert);

})

// get available time slots
exports.getAvailableSlots = asyncHandler(async (req, res) => {

    const expertId = req.params.id;
    const {date} = req.query;
    const dayOfWeek = new Date(date).getDay();

    const availability = await Availability.findOne({
        expert: expertId,
        dayOfWeek
    });

    if(!availability) {
        return res.json({ slots: []});
    }

    const generatedSlots = generateSlots(
        availability.startTime,
        availability.endTime,
        availability.slotDuration
    );

    const bookings = await Booking.find({
        expert: expertId,
        date
    });

    const bookedSlots = bookings.map((booking) => booking.timeSlot);

    const availableSlots = generateSlots.filter((slot) => !bookedSlots.includes(slot));

    res.json({ 
        date,
        slots: availableSlots });
});






//     const expert = await Expert.findById(expertId);

//     if(!expert){
//         return res.status(404).json({ message: "Expert not found"});
//     }

//     const bookings = await Booking.find({
//         expert: expertId
//     });

//     const bookedMap = {};

//     bookings.forEach((booking) => {
//         const date = booking.date.toISOString().split("T")[0];

//         if(!bookedMap[date]){
//             bookedMap[date] = [];
//         }
//         bookedMap[date].push(booking.timeSlot);
//     });

//     const availableSlots = expert.availableSlots.map((day) =>{
//         const dateStr = day.date.toISOString().split("T")[0];
//         const bookedSlots = bookedMap[dateStr] || [];

//         const freeSlots = day.slots.filter((slot) => !bookedSlots.includes(slot));
//         return {
//             date: dateStr,
//             slots: freeSlots,
//         };
//     });
//     res.json({
//         expertId,
//         availableSlots
//     });
