const express = require('express')
const { signUp, login, verifyUserToken, forgotPassword, resetPassword } = require('../controllers/authController')
const router = express.Router()

router.post('/signup', signUp)
router.post('/login', login)
router.post('/verify', verifyUserToken)
router.post('/forgot-password', forgotPassword)
router.patch('/reset-password/:resetToken', resetPassword)

module.exports = router 