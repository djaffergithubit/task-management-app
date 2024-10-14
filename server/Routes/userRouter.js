const express = require('express')
const { createUser, signInUser, getUser, editUserProfile } = require('../controllers/userController')
const isAuth = require('../Middleware/isAuth')
const router = express.Router()

router.post('/register', createUser)
router.post('/login', signInUser)
router.get('/get-user', isAuth, getUser)
router.post('/edit-user', isAuth, editUserProfile)
router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = router