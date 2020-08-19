import { UPDATE_USERNAME, UPDATE_PASSWORD, DELETE_USER, LOGIN_SUCCESS } from '../actions/types'
import axios from 'axios'
import { toast } from 'react-toastify'

export const updateUsername = (username, id) => async (dispatch, getState) => {
  const config = {
    headers: { 'notes-auth-token': getState().users.token }
  }
  try {
    const res = await axios.put(`/api/users/${id}/updateusername`, { username }, config)
    dispatch({
      type: UPDATE_USERNAME,
      payload: res.data
    })
  } catch (err) {
    toast(`Error ${err.response.status}: ${err.response.data.message}`)
  }
}

export const updatePassword = (password, id) => async (dispatch, getState) => {
  const config = {
    headers: { 'notes-auth-token': getState().users.token }
  }
  try {
    const res = await axios.put(`/api/users/${id}/updatepassword`, { password }, config)
    dispatch({
      type: UPDATE_PASSWORD,
      payload: res.data
    })
  } catch (err) {
    toast(`Error ${err.response.status}: ${err.response.data.message}`)
  }
}

export const updatePassword2 = (password, email) => async (dispatch, getState) => {
  const config = {
    headers: { 'notes-auth-token': getState().users.token }
  }
  try {
    const res = await axios.put(`/api/users/updatepassword`, { password, email }, config)
    dispatch({
      type: UPDATE_PASSWORD,
      payload: res.data
    })
    const res2 = await axios.post('/api/users/login', { email, password })
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res2.data
    })
  } catch (err) {
    toast(`Error ${err.response.status}: ${err.response.data.message}`)
  }
}

export const deleteUser = id => async (dispatch, getState) => {
  const config = {
    headers: { 'notes-auth-token': getState().users.token }
  }
  try {
    const res = await axios.delete(`/api/users/${id}`, config)
    dispatch({
      type: DELETE_USER,
      payload: res.data
    })
  } catch (err) {
    toast(`Error ${err.response.status}: ${err.response.data.message}`)
  }
}