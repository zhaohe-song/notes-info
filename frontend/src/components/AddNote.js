import React, { useState, Fragment } from 'react'
import { Modal, ModalBody, ModalFooter } from 'reactstrap'
import { connect } from 'react-redux'
import { addNote } from '../actions/notes'
import { toast } from 'react-toastify'

const AddNote = ({ addNote }) => {
  const [addModal, setAddModal] = useState(false)
  function toggleAdd() {
    setAddModal(prev => !prev)
  }
  const [content, setContent] = useState('')
  const [status, setStatus] = useState('private')
  function handleAdd(e) {
    e.preventDefault()
    if (!content) {
      toast('You cannot input empty note')
      return
    }
    addNote(content, status)
    setContent('')
    setStatus('private')
    setAddModal(false)
  }
  return (
    <Fragment>
      <button className="btn btn-outline-primary my-3" onClick={toggleAdd}>Add a new note</button>
      <Modal isOpen={addModal} toggle={toggleAdd}>
        <ModalBody>
          <form onSubmit={handleAdd}>
            <div className="form-group">
              <textarea
                rows="5"
                className="form-control"
                placeholder="Shift + Enter can submit"
                value={content}
                onChange={e => setContent(e.target.value)}
                onKeyDown={e => {
                  if (e.keyCode === 13 && e.shiftKey === true) {
                    e.preventDefault()
                    handleAdd(e)
                  }
                }}
              >
              </textarea>
            </div>
            <div className="form-group">
              <label htmlFor="status">Note status:</label>
              <select className="form-control" id="status" value={status} onChange={e => setStatus(e.target.value)}>
                <option value="public">public</option>
                <option value="private">private</option>
              </select>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-outline-primary" onClick={handleAdd}>Add</button>
          <button className="btn btn-outline-secondary" onClick={toggleAdd}>Cancel</button>
        </ModalFooter>
      </Modal>
    </Fragment>
  )
}

export default connect(null, { addNote })(AddNote)
