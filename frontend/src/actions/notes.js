import { GET_NOTES, ADD_NOTE } from './types'
import axios from 'axios'

export const getNotes = () => dispatch => {
  axios
    .get('/api/notes')
    .then(res => {
      dispatch({
        type: GET_NOTES,
        payload: res.data
      })
    })
    .catch(err => console.error(err))
}

export const addNote = body => dispatch => {
  axios
    .post('/api/notes', { body })
    .then(res => {
      dispatch({
        type: ADD_NOTE,
        payload: res.data
      })
    })
    .catch(err => console.error(err))
}