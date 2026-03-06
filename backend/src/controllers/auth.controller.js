const User = require('../models/user.model');
const asyncHandler = require('../middlewares/asyncHandler');
const generateToken = require('../utils/generateToken');
const bcrypt = require('bcrypt');



exports.register = asyncHandler( async (req, res) => {
    const { name, email, password }  = req.body;

    if(!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    } else {
        res.status(400).json({ message: "Invalid user data" });
    }
});

exports.login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({email});

    if(!user) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
        }
    })
})