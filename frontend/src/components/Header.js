import React, { Fragment, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { registerUser, loginUser } from '../actions/users'
import { updatePassword2 } from '../actions/user'
import axios from 'axios'

const Header = ({ users, registerUser, loginUser, updatePassword2 }) => {
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
  const [loginEmail, setLoginEmail] = useState('')
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
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      toast('Please input a real email')
      return
    }
    registerUser({ username, email, password })
    setRegisterModal(false)
  }

  function handleLogin(e) {
    e.preventDefault()
    const password = loginPassword.current.value
    if (!loginEmail || !password) {
      toast('Please input all fields')
      return
    }
    loginUser(loginEmail, password)
    setLoginEmail('')
    setLoginModal(false)
  }

  function resetRegister() {
    registerUsername.current.value = ''
    registerEmail.current.value = ''
    registerPassword.current.value = ''
    registerPassword2.current.value = ''
  }
  function resetLogin() {
    setLoginEmail('')
    loginPassword.current.value = ''
  }

  const [forgetModal, setForgetModal] = useState(false)
  function toggleForget() {
    setForgetModal(prev => !prev)
  }

  const verifyCode = useRef()
  const newPassword = useRef()
  const newPassword2 = useRef()
  const [code, setCode] = useState(Math.random().toString(36).slice(-6))

  async function handleForget() {
    if (!loginEmail) {
      toast('Input your email to get the code to reset your password')
      return
    }
    try {
      await axios.post('/api/users/sendcode', { loginEmail, code })
    } catch (err) {
      toast(`Error ${err.response.status}: ${err.response.data.message}`)
      return
    }
    setLoginModal(false)
    setForgetModal(true)
  }

  function handleUpdatePassword(e) {
    e.preventDefault()
    const vCode = verifyCode.current.value
    const password = newPassword.current.value
    const password2 = newPassword2.current.value

    if (!vCode || !password || !password2) {
      toast('Please input all fields')
      return
    }
    if (code !== vCode) {
      toast('You enter wrong verify code')
      return
    }
    if (password !== password2) {
      toast('You enter 2 different password')
      return
    }
    updatePassword2(password, loginEmail)
    setLoginEmail('')
    setForgetModal(false)
  }
  function resetForget() {
    verifyCode.current.value = ''
    newPassword.current.value = ''
    newPassword2.current.value = ''
  }

  const authLinks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link to="/user" className="nav-link btn btn-outline-secondary">{user ? `Welcome ${user.username}` : ''}</Link>
      </li>
    </ul>
  )
  const guestLinks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <button className="btn btn-outline-primary mr-2 mt-2" onClick={() => setRegisterModal(true)} >Register</button>
      </li>
      <li className="nav-item">
        <button className="btn btn-outline-primary mt-2" onClick={() => setLoginModal(true)} >Login</button>
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
            <li className="nav-item">
              <Link to="/chat" className="nav-link">Chat Room</Link>
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
          <button className="btn btn-outline-primary" onClick={handleRegister}>Register</button>
          <button className="btn btn-outline-secondary" onClick={resetRegister}>Reset</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={loginModal} toggle={toggleLogin}>
        <ModalHeader toggle={toggleLogin}>Login</ModalHeader>
        <ModalBody>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="loginEmail">Email</label>
              <input type="email" id="loginEmail" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} className="form-control" />
            </div>
            <div className="form-group">
              <label htmlFor="loginPassword">Password</label>
              <input type="password" id="loginPassword" ref={loginPassword} className="form-control" />
            </div>
            <input hidden type="submit" value="Submit" />
          </form>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-outline-primary" onClick={handleLogin}>Login</button>
          <button className="btn btn-outline-secondary" onClick={resetLogin}>Reset</button>
          <button className="btn btn-outline-secondary" onClick={handleForget}>Forget Password</button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={forgetModal} toggle={toggleForget}>
        <ModalHeader toggle={toggleForget}>Update your password</ModalHeader>
        <ModalBody>
          <form onSubmit={handleUpdatePassword}>
            <div className="form-group">
              <label htmlFor="verifyCode">Enter verify code you received in your email</label>
              <input id="verifyCode" ref={verifyCode} className="form-control" />
            </div>
            <div className="form-group">
              <label htmlFor="newPassword">Password</label>
              <input type="password" id="newPassword" ref={newPassword} className="form-control" />
            </div>
            <div className="form-group">
              <label htmlFor="newPassword2">Repeat Password</label>
              <input type="password" id="newPassword2" ref={newPassword2} className="form-control" />
            </div>
            <input hidden type="submit" value="Submit" />
          </form>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-outline-primary" onClick={handleUpdatePassword}>Update</button>
          <button className="btn btn-outline-secondary" onClick={resetForget}>Reset</button>
        </ModalFooter>
      </Modal>
    </Fragment>
  )
}

const mapStateToProps = state => ({
  users: state.users
})

export default connect(mapStateToProps, { registerUser, loginUser, updatePassword2 })(Header)