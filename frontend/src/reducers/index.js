import { combineReducers } from 'redux'
import users from './users'
import notes from './notes'
import messages from './messages'

export default combineReducers({
  users,
  notes,
  messages
})