import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getNotes } from '../actions/notes'
import PropTypes from 'prop-types'

const Notes = ({ notes, getNotes }) => {
  useEffect(() => getNotes(), [])
  return notes.map(note => <div key={note._id}>{note.body}</div>)
}

Notes.propTypes = {
  notes: PropTypes.array.isRequired,
  getNotes: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  notes: state.notes.notes
})

export default connect(mapStateToProps, { getNotes })(Notes)
