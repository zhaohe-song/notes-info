import React, { Fragment, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { registerUser, loginUser, logoutUser } from '../actions/users'

const Header = ({ users, registerUser, loginUser, logoutUser }) => {
  const { isAuthenticated, user } = users

  const [registerModal, setRegisterModal] = useState(false)
  function toggleRegister() {
    setRegisterModal(prev => !prev)
  }
  const registerUsername = useRef()
  const registerEmail = useRef()
  const registerPassword = useRef()
  const registerPassword2 = useRef()

  const [loginModal, setLoginModal] = useState(false)
  function toggleLogin() {
    setLoginModal(prev => !prev)
  }
  const loginEmail = useRef()
  const loginPassword = useRef()

  function handleRegister(e) {
    e.preventDefault()
    const username = registerUsername.current.value
    const email = registerEmail.current.value
    const password = registerPassword.current.value
    const password2 = registerPassword2.current.value
    if (!username || !email || !password || !password2) {
      toast('Please input all fields')
      return
    }
    if (password !== password2) {
      toast('You enter 2 different password')
      return
    }
    registerUser({ username, email, password })
    setRegisterModal(false)
  }

  function handleLogin(e) {
    e.preventDefault()
    const email = loginEmail.current.value
    const password = loginPassword.current.value
    if (!email || !password) {
      toast('Please input all fields')
      return
    }
    loginUser({ email, password })
    setLoginModal(false)
  }

  function resetRegister() {
    registerUsername.current.value = ''
    registerEmail.current.value = ''
    registerPassword.current.value = ''
    registerPassword2.current.value = ''
  }
  function resetLogin() {
    loginEmail.current.value = ''
    loginPassword.current.value = ''
  }

  const authLinks = (
    <ul className="navbar-nav ml-auto">
      <span className="navbar-text mr-3">
        <strong>{user ? `Welcome ${user.username}` : ''}</strong>
      </span>
      <li className="nav-item">
        <button onClick={() => logoutUser()} className="btn btn-secondary">
          Logout
        </button>
      </li>
    </ul>
  )
  const guestLinks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <button className="btn btn-primary mr-2 mt-2" onClick={() => setRegisterModal(true)} >Register</button>
      </li>
      <li className="nav-item">
        <button className="btn btn-primary mt-2" onClick={() => setLoginModal(true)} >Login</button>
      </li>
    </ul>
  )
  return (
    <Fragment>
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">Notes</Link>
            </li>
            <li className="nav-item">
              <Link to="/info" className="nav-link">Info</Link>
            </li>
          </ul>
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </nav>

      <Modal isOpen={registerModal} toggle={toggleRegister}>
        <ModalHeader toggle={toggleRegister}>Register</ModalHeader>
        <ModalBody>
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label htmlFor="registerUsername">Username</label>
              <input id="registerUsername" ref={registerUsername} className="form-control" />
            </div>
            <div className="form-group">
              <label htmlFor="registerEmail">Email</label>
              <input type="email" id="registerEmail" ref={registerEmail} className="form-control" />
            </div>
            <div className="form-group">
              <label htmlFor="registerPassword">Password</label>
              <input type="password" id="registerPassword" ref={registerPassword} className="form-control" />
            </div>
            <div className="form-group">
              <label htmlFor="registerPassword2">Repeat Password</label>
              <input type="password" id="registerPassword2" ref={registerPassword2} className="form-control" />
            </div>
            <input hidden type="submit" value="Submit" />
          </form>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={handleRegister}>Register</button>{' '}
          <button className="btn btn-secondary" onClick={resetRegister}>Reset</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={loginModal} toggle={toggleLogin}>
        <ModalHeader toggle={toggleLogin}>Login</ModalHeader>
        <ModalBody>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="loginEmail">Email</label>
              <input type="email" id="loginEmail" ref={loginEmail} className="form-control" />
            </div>
            <div className="form-group">
              <label htmlFor="loginPassword">Password</label>
              <input type="password" id="loginPassword" ref={loginPassword} className="form-control" />
            </div>
            <input hidden type="submit" value="Submit" />
          </form>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={handleLogin}>Login</button>{' '}
          <button className="btn btn-secondary" onClick={resetLogin}>Reset</button>
        </ModalFooter>
      </Modal>
    </Fragment>
  )
}

const mapStateToProps = state => ({
  users: state.users
})

export default connect(mapStateToProps, { registerUser, loginUser, logoutUser })(Header)