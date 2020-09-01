import React, { useState, useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import { getNotes, getPublicNotes } from '../actions/notes'
import PropTypes from 'prop-types'
import Note from './Note'
import AddNote from './AddNote'
import Spinner from './Spinner'
import PublicNote from './PublicNote'

const Notes = ({ isAuthenticated, notes, publicNotes, getNotes, getPublicNotes }) => {
  const [isPublicLoading, setIsPublicLoading] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    function fetchPublicNotes() {
      getPublicNotes()
      setIsPublicLoading(false)
    }
    fetchPublicNotes()
  }, [])

  useEffect(() => {
    function fetchNotes() {
      getNotes()
      setIsLoading(false)
    }
    fetchNotes()
  }, [isAuthenticated])

  return (
    <Fragment>
      {
        isAuthenticated ? (
          (isLoading || isPublicLoading) ? (
            <Spinner />
          ) : (
              <Fragment>
                <AddNote />
                <div className="list-group">
                  {notes.map(note => <Note key={note._id} note={note} />)}
                </div>
                <hr />
                <h3>Public Notes</h3>
                <div className="row">
                  {publicNotes.map(note => <PublicNote key={note._id} note={note} isAuthenticated={isAuthenticated} />)}
                </div>
              </Fragment>
            )
        ) : (
            <Fragment>
              <div className="text-warning my-3">Please login to see private notes</div>
              <div className="row">
                {publicNotes.map(note => <PublicNote key={note._id} note={note} isAuthenticated={isAuthenticated} />)}
              </div>
            </Fragment>
          )
      }
    </Fragment>
  )
}

Notes.propTypes = {
  isAuthenticated: PropTypes.bool,
  notes: PropTypes.array.isRequired,
  publicNotes: PropTypes.array.isRequired,
  getNotes: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.users.isAuthenticated,
  notes: state.notes.notes,
  publicNotes: state.notes.publicNotes
})

export default connect(mapStateToProps, { getNotes, getPublicNotes })(Notes)
