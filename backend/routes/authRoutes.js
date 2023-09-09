const express = require('express')
const { signUp, login, verifyUserToken, forgotPassword } = require('../controllers/authController')
const router = express.Router()

router.post('/signup', signUp)
router.post('/login', login)
router.post('/verify-token', verifyUserToken)
router.post('/forgot-password', forgotPassword)

module.exports = router