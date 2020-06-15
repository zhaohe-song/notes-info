import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addNote } from '../actions/notes'

const AddNote = ({ addNote }) => {
  const [body, setBody] = useState('')
  function onSubmit(e) {
    e.preventDefault()
    addNote(body)
    setBody('')
  }
  return (
    <form onSubmit={onSubmit}>
      <input value={body} onChange={e => setBody(e.target.value)} />
    </form>
  )
}

export default connect(null, { addNote })(AddNote)
