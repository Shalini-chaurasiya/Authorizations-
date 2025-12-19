const router = require('express').Router();
const { signup } = require('../controllers/authController');
const { signupValidation } = require('../middlewares/authValidation.js'); // fixed filename

// Signup route
router.post('/signup', signupValidation, signup);

// Temporary login route
router.post('/login', (req, res) => {
    res.send('Login success');
});

module.exports = router;
