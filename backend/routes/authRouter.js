const router = require('express').Router();
const { signup, login } = require('../controllers/authController');
const { signupValidation, loginValidation } = require('../middlewares/authValidation.js');

// Signup route
router.post('/signup', signupValidation, signup);

// Login route
router.post('/login', loginValidation, login);

module.exports = router;
