import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutUser } from '../actions/users'
import { updateUsername, updatePassword, deleteUser } from '../actions/user'
import { Redirect } from 'react-router-dom'
import { Modal, ModalBody, Alert, ModalFooter, ModalHeader } from 'reactstrap'
import { toast } from 'react-toastify'

const User = ({ isAuthenticated, user, updateUsername, updatePassword, deleteUser, logoutUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [usernameModal, setUsernameModal] = useState(false)
  const [passwordModal, setPasswordModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)

  function toggleUsername() {
    setUsernameModal(prev => !prev)
  }
  function handleUsername(e) {
    e.preventDefault()
    if (username === '') {
      toast('Empty username!')
      return
    }
    updateUsername(username, user._id)
    setUsernameModal(false)
  }

  function togglePassword() {
    setPasswordModal(prev => !prev)
  }
  function handlePassword(e) {
    e.preventDefault()
    if (password === '' || password2 === '') {
      toast('Empty password!')
      return
    }
    if (password !== password2) {
      toast('Different password!')
      return
    }
    updatePassword(password, user._id)
    setPasswordModal(false)
  }

  function toggleDelete() {
    setDeleteModal(prev => !prev)
  }

  if (!isAuthenticated) {
    return <Redirect to="/" />
  }
  return (
    <Fragment>
      {
        !user.isVerified &&
        <Alert className="mt-3" color="warning">
          Verify your account in your email({user.email}) to get more funtion including changing password and deleting account
        </Alert>
      }

      <div className="mt-3 row justify-content-center text-primary">
        <button className="btn btn-outline-primary" onClick={toggleUsername}>
          <i className="fas fa-edit"></i> Change Username
        </button>
      </div>
      <Modal isOpen={usernameModal} toggle={toggleUsername}>
        <ModalBody>
          <form onSubmit={handleUsername}>
            <input
              className="form-control"
              value={username}
              placeholder={user.username}
              onChange={e => setUsername(e.target.value)}
            />
          </form>
        </ModalBody>
      </Modal>

      <div className="mt-3 row justify-content-center">
        <button onClick={() => logoutUser()} className="btn btn-outline-danger">
          <i className="fas fa-sign-out-alt"></i> Logout
        </button>
      </div>

      {
        user.isVerified &&
        <div className="mt-3 row justify-content-center">
          <button className="btn btn-outline-primary" onClick={togglePassword}>
            <i className="fas fa-edit"></i> Change Password
          </button>
        </div>
      }
      <Modal isOpen={passwordModal} toggle={togglePassword}>
        <ModalBody>
          <form onSubmit={handlePassword}>
            <div className="form-group">
              <input
                className="form-control"
                placeholder="New password"
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                placeholder="Repeat new password"
                onChange={e => setPassword2(e.target.value)}
              />
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-outline-primary" onClick={handlePassword}>Update</button>
          <button className="btn btn-outline-secondary" onClick={togglePassword}>Cancel</button>
        </ModalFooter>
      </Modal>

      {
        user.isVerified &&
        <div className="mt-3 row justify-content-center">
          <button onClick={toggleDelete} className="btn btn-outline-danger">
            <i className="fas fa-trash-alt"></i> Delete Account
          </button>
        </div>
      }
      <Modal isOpen={deleteModal} toggle={toggleDelete}>
        <ModalHeader toggle={toggleDelete}>
          <Alert color="warning">
            Once you delete your account, you will lose all the notes!
          </Alert>
        </ModalHeader>
        <ModalFooter>
          <button className="btn btn-outline-danger" onClick={() => deleteUser(user._id)}>Delete</button>
          <button className="btn btn-outline-secondary" onClick={toggleDelete}>Cancel</button>
        </ModalFooter>
      </Modal>
    </Fragment>
  )
}

User.propTypes = {
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object
}

const mapStateToProps = state => ({
  isAuthenticated: state.users.isAuthenticated,
  user: state.users.user
})

export default connect(mapStateToProps, { updateUsername, updatePassword, deleteUser, logoutUser })(User)
