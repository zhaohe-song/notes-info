import React, { useState, Fragment } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { connect } from 'react-redux'
import { updateNote, deleteNote } from '../actions/notes'
import { toast } from 'react-toastify'

const Note = ({ note, updateNote, deleteNote }) => {
  const [updateModal, setUpdateModal] = useState(false)
  const [content, setContent] = useState(note.content)
  function toggleUpdate() {
    setUpdateModal(prev => !prev)
  }
  function handleUpdate(e) {
    e.preventDefault()
    if (content === '') {
      toast('You cannot input empty note')
      return
    }
    updateNote(content, note._id)
    setUpdateModal(false)
  }

  const [deleteModal, setDeleteModal] = useState(false)
  function toggleDelete() {
    setDeleteModal(prev => !prev)
  }

  return (
    <Fragment>
      <li className="list-group-item list-group-item-action">
        <div>
          <button className="btn btn-sm btn-outline-primary" onClick={toggleDelete}>
            <i className="fas fa-trash-alt" title="Delete it"></i>
          </button>
          <button className="btn btn-sm btn-outline-primary mx-3" onClick={toggleUpdate}>
            <i className="fas fa-edit" title="Edit it"></i>
          </button>
        </div>
        <div className="mt-3">
          {note.content.split('\n').map((line, index) => <div key={index}>{line}</div>)}
        </div>
      </li>
      <Modal isOpen={deleteModal} toggle={toggleDelete}>
        <ModalHeader toggle={toggleDelete}>
          Are you sure you want to delete this note?
        </ModalHeader>
        <ModalFooter>
          <button className="btn btn-outline-danger" onClick={() => deleteNote(note._id)}>Delete</button>
          <button className="btn btn-outline-secondary" onClick={toggleDelete}>Cancel</button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={updateModal} toggle={toggleUpdate}>
        <ModalBody>
          <form onSubmit={handleUpdate}>
            <textarea
              rows="5"
              className="form-control"
              value={content}
              onChange={e => setContent(e.target.value)}
              onKeyDown={e => {
                if (e.keyCode === 13 && e.shiftKey === true) {
                  e.preventDefault()
                  handleUpdate(e)
                }
              }}
            >
            </textarea>
          </form>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-outline-primary" onClick={handleUpdate}>Update</button>
          <button className="btn btn-outline-secondary" onClick={toggleUpdate}>Cancel</button>
        </ModalFooter>
      </Modal>
    </Fragment>
  )
}

export default connect(null, { updateNote, deleteNote })(Note)
