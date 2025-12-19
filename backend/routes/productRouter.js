const router = require('express').Router();
const ensureAuthenticated = require('../middlewares/auth');

// Protected products route
router.get('/', ensureAuthenticated, (req, res) => {
    console.log('----logged in user detail----', req.user);
    res.status(200).json([
        {
            name: "mobile",
            price: 1000
        },
        {
            name: "tv",
            price: 20000
        }
    ]);
});

module.exports = router;
