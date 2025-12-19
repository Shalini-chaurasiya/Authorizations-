const bcrypt = require('bcrypt');
const UserModel = require('../models/User');

// Signup function
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409).json({
                message: 'User already exists, you can login',
                success: false
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user
        const newUser = new UserModel({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({
            message: "Signup successful",
            success: true
        });

    } catch (err) {
        console.error('Signup error:', err);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// Login function
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password",
                success: false
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password",
                success: false
            });
        }

        // Success
        res.status(200).json({
            message: "Login successful",
            success: true
        });

    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// Export both functions
module.exports = { signup, login };
