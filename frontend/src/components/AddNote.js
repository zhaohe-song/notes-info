import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addNote } from '../actions/notes'

const AddNote = ({ addNote }) => {
  const [content, setContent] = useState('')
  function onSubmit(e) {
    e.preventDefault()
    addNote(content)
    setContent('')
  }
  return (
    <form onSubmit={onSubmit}>
      <input value={content} onChange={e => setContent(e.target.value)} />
    </form>
  )
}

export default connect(null, { addNote })(AddNote)
