const asyncHandler = require('../middlewares/asyncHandler');
const Expert = require('../models/expert.model');


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