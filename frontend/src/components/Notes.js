import React, { useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import { getNotes } from '../actions/notes'
import PropTypes from 'prop-types'
import Note from './Note'
import AddNote from './AddNote'

const Notes = ({ isAuthenticated, notes, getNotes }) => {
  useEffect(() => {
    function fetchNotes() {
      getNotes()
    }
    fetchNotes()
  }, [isAuthenticated])

  return (
    <Fragment>
      {isAuthenticated
        ?
          <Fragment>
            <AddNote />
            <div className="list-group">
              {notes.map(note => <Note key={note._id} note={note} />)}
            </div>
          </Fragment>
        :
          <div className="text-primary mt-3">Please login to use the notes</div>

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
