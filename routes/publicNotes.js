const express = require('express')
const Note = require('../models/Note')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const notes = await Note.find({ status: 'public' }).lean()
    res.json(notes)
  } catch (err) {
    console.log(chalk.red(`${err.name}: ${err.message}`))
    res.status(500).json({ message: 'Server Error' })
  }
})

module.exports = router