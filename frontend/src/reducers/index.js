import { combineReducers } from 'redux'
import users from './users'
import notes from './notes'

export default combineReducers({
  users,
  notes
})