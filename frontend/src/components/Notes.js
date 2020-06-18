import React, { useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import { getNotes } from '../actions/notes'
import PropTypes from 'prop-types'
import AddNote from './AddNote'

const Notes = ({ isAuthenticated, notes, getNotes }) => {
  useEffect(() => getNotes(), [isAuthenticated])
  return (
    <Fragment>
      {isAuthenticated &&
        <Fragment>
          {notes.map(note => <div key={note._id}>{note.content}</div>)}
          <AddNote />
        </Fragment>
      }
    </Fragment>
  )
}

Notes.propTypes = {
  isAuthenticated: PropTypes.bool,
  notes: PropTypes.array.isRequired,
  getNotes: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.users.isAuthenticated,
  notes: state.notes.notes,
})

export default connect(mapStateToProps, { getNotes })(Notes)
