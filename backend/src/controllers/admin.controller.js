const asyncHandler = require("../middlewares/asyncHandler");

exports.approveExpert = asyncHandler(async (req, res) => {
  const expert = await User.findById(req.params.id);

  if (!expert) {
    return res.status(404).json({ message: "Expert not found" });
  }

  expert.status = "approved";
  await expert.save();

  res.status(200).json({ message: "Expert approved successfully" });
});

// get experts list
exports.getExperts = asyncHandler(async(req, res) => {
    const experts = await User.find({
        role: "expert"
    })
    res.json(experts);
})