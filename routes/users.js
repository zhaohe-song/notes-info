const express = require('express')
const auth = require('../middleware/auth')
const { registerUser, verifyUser, loginUser, authUser } = require('../controllers/users')
const { updateUsername, updatePassword, deleteUser, sendVerifyCode, updatePassword2 } = require('../controllers/user')

const router = express.Router()

router.post('/register', registerUser)

router.get('/verify', verifyUser)

router.post('/login', loginUser)

router.get('/auth', auth, authUser)

router.put('/:id/updateusername', auth, updateUsername)

router.put('/:id/updatepassword', auth, updatePassword)

router.delete('/:id', auth, deleteUser)

router.post('/sendcode', sendVerifyCode)

router.put('/updatepassword', updatePassword2)

module.exports = router