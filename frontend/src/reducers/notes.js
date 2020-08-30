import { GET_PUBLIC_NOTES, GET_NOTES, ADD_NOTE, UPDATE_NOTE, DELETE_NOTE } from '../actions/types'

const initialState = {
  notes: [],
  publicNotes: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PUBLIC_NOTES:
      return {
        ...state,
        publicNotes: action.payload
      }
    case GET_NOTES:
      return {
        ...state,
        notes: action.payload
      }
    case ADD_NOTE:
      if (action.payload.status === 'public') {
        return {
          ...state,
          notes: [...state.notes, action.payload],
          publicNotes: [...state.publicNotes, action.payload]
        }
      }
      return {
        ...state,
        notes: [...state.notes, action.payload]
      }
    case UPDATE_NOTE:
      if (action.payload.status === 'public') {
        for (let each of state.publicNotes) {
          if (each._id === action.payload._id) {
            return {
              ...state,
              notes: state.notes.map(note => {
                if (note._id === action.payload._id) {
                  return action.payload
                }
                return note
              }),
              publicNotes: state.publicNotes.map(note => {
                if (note._id === action.payload._id) {
                  return action.payload
                }
                return note
              })
            }
          }
        }
        return {
          ...state,
          notes: state.notes.map(note => {
            if (note._id === action.payload._id) {
              return action.payload
            }
            return note
          }),
          publicNotes: [...state.publicNotes, action.payload]
        }
      } else if (action.payload.status === 'private') {
        for (let each of state.publicNotes) {
          if (each._id === action.payload._id) {
            return {
              ...state,
              notes: state.notes.map(note => {
                if (note._id === action.payload._id) {
                  return action.payload
                }
                return note
              }),
              publicNotes: state.publicNotes.filter(note => note._id !== action.payload._id)
            }
          }
        }
        return {
          ...state,
          notes: state.notes.map(note => {
            if (note._id === action.payload._id) {
              return action.payload
            }
            return note
          })
        }
      }
    case DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter(note => note._id !== action.payload),
        publicNotes: state.publicNotes.filter(note => note._id !== action.payload)
      }
    default:
      return state
  }
}