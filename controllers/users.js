const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const chalk = require('chalk')

// @desc Register a new user
// @route POST /api/users/register
// @access Public
exports.registerUser = async (req, res) => {
  let { username, email, password } = req.body
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Please input all fields' })
  }
  try {
    const user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ message: 'Email has already been registered' })
    }
    const salt = await bcryptjs.genSalt()
    const hash = await bcryptjs.hash(password, salt)
    password = hash
    const newUser = await User.create({ username, email, password })
    jwt.sign(
      { id: newUser.id },
      process.env.JWTSECRET,
      // { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err
        res.json({
          token,
          user: {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email
          }
        })
      }
    )
  } catch (err) {
    console.log(chalk.red(`${err.name}: ${err.message}`))
    res.status(500).json({ message: 'Server Error' })
  }
}

// @desc Login a user
// @route POST /api/user/login
// @access Public
exports.loginUser = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ message: 'Please input all fields' })
  }
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'User does not exist' })
    }
    const isMatch = await bcryptjs.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Wrong password' })
    }
    jwt.sign(
      { id: user.id },
      process.env.JWTSECRET,
      (err, token) => {
        if (err) throw err
        res.json({
          token,
          user: {
            id: user.id,
            username: user.username,
            email: user.email
          }
        })
      }
    )
  } catch (err) {
    console.log(chalk.red(`${err.name}: ${err.message}`))
    res.status(500).json({ message: 'Server Error' })
  }
}

// @desc Auth the user
// @route GET /api/users/auth
// @access Private
exports.authUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password -register_date')
    res.json({ user })
  } catch (err) {
    console.log(chalk.red(`${err.name}: ${err.message}`))
    res.status(500).json({ message: 'Server Error' })
  }
}