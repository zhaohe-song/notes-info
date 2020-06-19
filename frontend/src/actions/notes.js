import { GET_NOTES, ADD_NOTE, UPDATE_NOTE, DELETE_NOTE } from './types'
import axios from 'axios'
import { toast } from 'react-toastify'


export const getNotes = () => async (dispatch, getState) => {
  const config = {
    headers: { 'notes-auth-token': getState().users.token }
  }
  try {
    const res = await axios.get('/api/notes', config)
    dispatch({
      type: GET_NOTES,
      payload: res.data
    })
  } catch (err) {
    console.error(err)
  }
}

export const addNote = content => async (dispatch, getState) => {
  const config = {
    headers: { 'notes-auth-token': getState().users.token }
  }
  try {
    const res = await axios.post('/api/notes', { content }, config)
    dispatch({
      type: ADD_NOTE,
      payload: res.data
    })
  } catch (err) {
    toast(`Error ${err.response.status}: ${err.response.data.message}`)
  }
}

export const updateNote = (content, id) => async (dispatch, getState) => {
  const config = {
    headers: { 'notes-auth-token': getState().users.token }
  }
  try {
    const res = await axios.put(`/api/notes/${id}`, { content }, config)
    dispatch({
      type: UPDATE_NOTE,
      payload: res.data
    })
  } catch (err) {
    toast(`Error ${err.response.status}: ${err.response.data.message}`)
  }
}

export const deleteNote = id => async (dispatch, getState) => {
  const config = {
    headers: { 'notes-auth-token': getState().users.token }
  }
  try {
    const res = await axios.delete(`/api/notes/${id}`, config)
    dispatch({
      type: DELETE_NOTE,
      payload: res.data._id
    })
  } catch (err) {
    toast(`Error ${err.response.status}: ${err.response.data.message}`)
  }
}