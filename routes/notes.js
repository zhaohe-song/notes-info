const express = require('express')
const Note = require('../models/Note')

const router = express.Router()

router.get('/', (req, res) => {
  Note
    .find()
    .then(data => res.json(data))
    .catch(err => console.log(err.message))
})

router.post('/', (req, res) => {
  Note
    .create({ content: req.body.content })
    .then(data => res.json(data))
    .catch(err => console.log(err.message))
})

module.exports = router