const bcrypt = require('bcrypt');
const UserModel = require('../models/User');

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

        // Hash password and save user
        const hashedPassword = await bcrypt.hash(password, 10);
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

module.exports = { signup };
