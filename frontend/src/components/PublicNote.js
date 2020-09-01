import React, { useState, Fragment } from 'react'
import { connect } from 'react-redux'
import { addNote } from '../actions/notes'
import { Tooltip } from 'reactstrap'

const PublicNote = ({ note, isAuthenticated, addNote }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false)
  function toggle() {
    setTooltipOpen(prev => !prev)
  }
  function handleAdd() {
    addNote(note.content, 'private')
  }
  return (
    <div className="col-md-6">
      <div className="card mb-3 shadow">
        <div className="card-body">
          {note.content.split('\n').map((line, index) => <div key={index}>{line}</div>)}
          {
            isAuthenticated &&
            <Fragment>
              <button
                className="float-right btn btn-sm btn-outline-primary"
                onClick={handleAdd}
                id="add"
              >
                <i className="fas fa-plus"></i>
              </button>
              <Tooltip placement="auto" isOpen={tooltipOpen} target="add" toggle={toggle}>
                Add it to your private notes
            </Tooltip>
            </Fragment>
          }
        </div>
      </div>
    </div>
  )
}

export default connect(null, { addNote })(PublicNote)
