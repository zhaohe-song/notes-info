import { REGISTER_FAIL, REGISTER_SUCCESS, LOGIN_FAIL, LOGIN_SUCCESS, AUTH_FAIL, AUTH_SUCCESS, LOGOUT_SUCCESS } from './types'
import axios from 'axios'
import { toast } from 'react-toastify'

export const registerUser = ({ username, email, password }) => async dispatch => {
  try {
    const res = await axios.post('/api/users/register', { username, email, password })
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    })
  } catch (err) {
    toast(`Error ${err.response.status}: ${err.response.data.message}`)
    dispatch({ type: REGISTER_FAIL })
  }
}

export const loginUser = (email, password) => async dispatch => {
  try {
    const res = await axios.post('/api/users/login', { email, password })
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    })
  } catch (err) {
    toast(`Error ${err.response.status}: ${err.response.data.message}`)
    dispatch({ type: LOGIN_FAIL })
  }
}

export const authUser = () => async (dispatch, getState) => {
  const config = {
    headers: { 'notes-auth-token': getState().users.token }
  }
  try {
    const res = await axios.get('/api/users/auth', config)
    dispatch({
      type: AUTH_SUCCESS,
      payload: res.data
    })
  } catch (err) {
    dispatch({ type: AUTH_FAIL })
  }
}

export const logoutUser = () => (dispatch, getState) => {
  toast(`Goodbye ${getState().users.user.username}`)
  dispatch({ type: LOGOUT_SUCCESS })
}