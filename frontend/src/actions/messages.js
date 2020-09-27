import { SEND_MESSAGE } from './types'

export const addMessage = message => dispatch => {
  dispatch({
    type: SEND_MESSAGE,
    payload: message
  })
}