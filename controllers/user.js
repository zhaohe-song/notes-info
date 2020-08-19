const User = require('../models/User')
const chalk = require('chalk')
const bcryptjs = require('bcryptjs')
const nodemailer = require('nodemailer')

// @desc Update username
// @route PUT /api/users/:id/updateusername
// @access Private
exports.updateUsername = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password -register_date -verifyString')
    user.username = req.body.username
    await user.save()
    res.json(user)
  } catch (err) {
    console.log(chalk.red(`${err.name}: ${err.message}`))
    res.status(500).json({ message: 'Server Error' })
  }
}

// @desc Update user password
// @route PUT /api/users/:id/updatepassword
// @access Private
exports.updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password -register_date -verifyString')
    user.password = await bcryptjs.hash(req.body.password, 10)
    await user.save()
    res.json(user)
  } catch (err) {
    console.log(chalk.red(`${err.name}: ${err.message}`))
    res.status(500).json({ message: 'Server Error' })
  }
}

// @desc Delete user account
// @route DELETE /api/users/:id
// @access Private
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    res.json(user)
  } catch (err) {
    console.log(chalk.red(`${err.name}: ${err.message}`))
    res.status(500).json({ message: 'Server Error' })
  }
}

exports.sendVerifyCode = async (req, res) => {
  const user = await User.findOne({ email: req.body.loginEmail })
  if (!user) {
    return res.status(400).json({ message: 'Email not registered' })
  }
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'notesfrominfo@gmail.com',
        pass: 'widgak-gekru1-byhJoq'
      }
    })
    html = `Hello, please copy the verify code to reset your password. <br> <br> <strong style="font-size: 3em">${req.body.code}</strong>`
    const info = await transporter.sendMail({
      from: 'Notes-Info notesfrominfo@gmail.com',
      to: req.body.loginEmail,
      subject: `Hello, do you require verify code to reset your password?`,
      html: html
    });
    res.send(info.messageId)
  } catch (err) {
    console.log(chalk.red(`${err.name}: ${err.message}`))
    res.status(500).json({ message: 'Server Error' })
  }
}

// @desc Update user password through email verify code
// @route PUT /api/users/updatepassword
// @access Private
exports.updatePassword2 = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).select('-register_date -verifyString')
    user.password = await bcryptjs.hash(req.body.password, 10)
    user.isVerified = true
    await user.save()
    res.json(user)
  } catch (err) {
    console.log(chalk.red(`${err.name}: ${err.message}`))
    res.status(500).json({ message: 'Server Error' })
  }
}
