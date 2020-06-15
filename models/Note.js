const mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema({
  body: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Note = mongoose.model('note', NoteSchema)