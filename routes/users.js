const express = require('express')
const auth = require('../middleware/auth')
const { registerUser, loginUser, authUser } = require('../controllers/users')

const router = express.Router()

router.post('/register', registerUser)

router.post('/login', loginUser)

router.get('/auth', auth, authUser)

module.exports = router