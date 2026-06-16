const express = require('express')

const router = express.Router()

const authRoute = require('../controllers/auth.controller')


router.post('/register', authRoute.authRegister)
router.post('/login', authRoute.authLogin)

module.exports = router