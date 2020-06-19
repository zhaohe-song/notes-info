import { GET_NOTES, ADD_NOTE, UPDATE_NOTE, DELETE_NOTE } from '../actions/types'

const initialState = {
  notes: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_NOTES:
      return {
        ...state,
        notes: action.payload
      }
    case ADD_NOTE:
      return {
        ...state,
        notes: [...state.notes, action.payload]
      }
    case UPDATE_NOTE:
      return {
        ...state,
        notes: state.notes.map(note => {
          if (note._id === action.payload._id) {
            return action.payload
          }
          return note
        })
      }
    case DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter(note => note._id !== action.payload)
      }
    default:
      return state
  }
}