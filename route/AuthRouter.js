const express = require('express')
const router = express.Router()
const authController = require('../controller/auth.controller')

console.log('auth router')
router.post('/register', authController.createUser)
router.post('/login', authController.authUser)

module.exports = router