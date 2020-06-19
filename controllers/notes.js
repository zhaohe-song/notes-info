const Note = require('../models/Note')
const chalk = require('chalk')

// @desc Get notes
// @route GET /api/notes
// @access Private
exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id })
    res.json(notes)
  } catch (err) {
    console.log(chalk.red(`${err.name}: ${err.message}`))
    res.status(500).json({ message: 'Server Error' })
  }
}

// @desc Add a note
// @route POST /api/notes
// @access Private
exports.addNote = async (req, res) => {
  try {
    const note = await Note.create({
      content: req.body.content,
      user: req.user.id
    })
    // const note = new Note({
    //   content: req.body.content,
    //   user: req.user.id
    // })
    // await note.save()
    // API create === new + save
    res.json(note)
  } catch (err) {
    console.log(chalk.red(`${err.name}: ${err.message}`))
    res.status(500).json({ message: 'Server Error' })
  }
}

// @desc Update a note
// @route PUT /api/notes/:id
// @access Private
exports.updateNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id)
    note.content = req.body.content
    await note.save()
    // const note = await Note.findByIdAndUpdate(
    //   req.params.id,
    //   { content: req.body.content },
    //   { new: true }
    // )
    // This is weird, but ok, and findByIdAndUpdate actually calls .save
    res.json(note)
  } catch (err) {
    console.log(chalk.red(`${err.name}: ${err.message}`))
    res.status(500).json({ message: 'Server Error' })
  }
}

// @desc Delete a note
// @route DELETE /api/notes/:id
// @access Private
exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id)
    res.json(note)
  } catch (err) {
    console.log(chalk.red(`${err.name}: ${err.message}`))
    res.status(500).json({ message: 'Server Error' })
  }
}