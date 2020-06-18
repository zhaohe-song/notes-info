import { GET_NOTES, ADD_NOTE } from './types'
import axios from 'axios'

export const getNotes = () => (dispatch, getState) => {
  const config = {
    headers: { 'notes-auth-token': getState().users.token }
  }
  axios
    .get('/api/notes', config)
    .then(res => {
      dispatch({
        type: GET_NOTES,
        payload: res.data
      })
    })
    .catch(err => console.error(err))
}

export const addNote = content => (dispatch, getState) => {
  const config = {
    headers: { 'notes-auth-token': getState().users.token }
  }
  axios
    .post('/api/notes', { content }, config)
    .then(res => {
      dispatch({
        type: ADD_NOTE,
        payload: res.data
      })
    })
    .catch(err => console.error(err))
}