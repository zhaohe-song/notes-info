const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const chalk = require('chalk')
const uuid = require('uuid')
const nodemailer = require('nodemailer')

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
    const hash = await bcryptjs.hash(password, 10)
    password = hash
    const verifyString = uuid.v4() + uuid.v4()
    const newUser = await User.create({ username, email, password, verifyString })

    // send verify email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'notesfrominfo@gmail.com',
        pass: 'widgak-gekru1-byhJoq'
      }
    })
    const host = req.get('host')
    const link = `http://${host}/api/users/verify?id=${newUser.id}&verifystring=${newUser.verifyString}`
    const html = `Hello ${username}, <br> <br> Thanks for your registration at Notes-Info. <br> <br> Please Click on the link to verify your email. <br> <br> <a href=${link}>${link}</a>`
    const info = await transporter.sendMail({
      from: 'Notes-Info notesfrominfo@gmail.com',
      to: email,
      subject: `Hello ${username}, please confirm your Email account`,
      html: html
    });
    // console.log(`Email sent: ${info.messageId}`);

    jwt.sign(
      { id: newUser.id },
      process.env.JWTSECRET,
      // { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err
        res.json({
          token,
          user: {
            _id: newUser.id,
            username: newUser.username,
            email: newUser.email,
            isVerified: newUser.isVerified
          }
        })
      }
    )
  } catch (err) {
    // delete user if something goes wrong sending email
    await User.findOneAndDelete({ email })
    console.log(chalk.red(`${err.name}: ${err.message}`))
    res.status(500).json({ message: 'Server Error' })
  }
}

// @desc Verify a User
// @route GET /api/user/verify
// @access Public
exports.verifyUser = async (req, res) => {
  try {
    const host = req.get('host')
    const user = await User.findById(req.query.id)
    if (user.isVerified === true) {
      res.send(`<strong>You have already verified your Email</strong> <br> <br> <a href="http://${host}">Go to Main Page</a>`)
    }
    if (user.verifyString === req.query.verifystring) {
      user.isVerified = true
      await user.save()
      res.send(`<strong>Hi ${user.username}, You have successfully verified your Email</strong> <br> <br> <a href="http://localhost:3000">Go to Main Page</a>`)
    }
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
            _id: user.id,
            username: user.username,
            email: user.email,
            isVerified: user.isVerified
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
    const user = await User.findById(req.user.id).select('-password -register_date -verifyString')
    res.json({ user })
  } catch (err) {
    console.log(chalk.red(`${err.name}: ${err.message}`))
    res.status(500).json({ message: 'Server Error' })
  }
}