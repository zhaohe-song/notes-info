import { REGISTER_FAIL, REGISTER_SUCCESS, LOGIN_FAIL, LOGIN_SUCCESS, AUTH_FAIL, AUTH_SUCCESS, LOGOUT_SUCCESS } from '../actions/types'

const initialState = {
  isAuthenticated: false,
  token: localStorage.getItem('token'),
  user: null
}

export default function (state = initialState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        ...action.payload
      }
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token)
      return {
        ...state,
        isAuthenticated: true,
        ...action.payload
      }
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_FAIL:
    case LOGOUT_SUCCESS:
      localStorage.removeItem('token')
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        user: null
      }
    default:
      return state
  }
}