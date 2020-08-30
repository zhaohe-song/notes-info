import { GET_PUBLIC_NOTES, GET_NOTES, ADD_NOTE, UPDATE_NOTE, DELETE_NOTE } from './types'
import axios from 'axios'
import { toast } from 'react-toastify'

export const getPublicNotes = () => async dispatch => {
  try {
    const res = await axios.get('/api/publicNotes')
    dispatch({
      type: GET_PUBLIC_NOTES,
      payload: res.data
    })
  } catch (err) {
    console.error(err)
  }
}

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

export const addNote = (content, status) => async (dispatch, getState) => {
  const config = {
    headers: { 'notes-auth-token': getState().users.token }
  }
  try {
    const res = await axios.post('/api/notes', { content, status }, config)
    dispatch({
      type: ADD_NOTE,
      payload: res.data
    })
  } catch (err) {
    toast(`Error ${err.response.status}: ${err.response.data.message}`)
  }
}

export const updateNote = (content, id, status) => async (dispatch, getState) => {
  const config = {
    headers: { 'notes-auth-token': getState().users.token }
  }
  try {
    const res = await axios.put(`/api/notes/${id}`, { content, status }, config)
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