import React, { Fragment, useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addMessage } from '../actions/messages'
import { w3cwebsocket } from 'websocket'
import { Card, Avatar, Input } from 'antd'
import 'antd/dist/antd.css'

const { Search } = Input
const { Meta } = Card

const client = new w3cwebsocket(`ws://${window.location.host}`)

const Chat = ({ isAuthenticated, user, allMessages, addMessage }) => {
  const [messages, setMessages] = useState(allMessages)
  const [message, setMessage] = useState('')

  useEffect(() => {
    setMessages(allMessages)
  }, [allMessages])

  useEffect(() => {
    client.onmessage = message => {
      const dataFromServer = JSON.parse(message.data)
      if (dataFromServer.type === 'message') {
        addMessage({
          msg: dataFromServer.msg,
          username: dataFromServer.username
        })
      }
    }
  }, [])

  const setRef = useCallback(node => {
    if (node) {
      node.scrollIntoView({ smooth: true })
    }
  }, [])

  function sendMessage(msg) {
    client.send(JSON.stringify({
      type: 'message',
      msg,
      username: user.username
    }))
    setMessage('')
  }

  return (
    <Fragment>
      {
        isAuthenticated ? (
          <Fragment>
            <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 50 }}>
              {messages.map((msg, index) => {
                const isLastMessage = messages.length - 1 === index
                return (
                  <div
                    key={index}
                    ref={(isLastMessage && user.username === msg.username) ? setRef : null}
                    style={{
                      width: 350,
                      margin: '16px 4px 0 4px',
                      alignSelf: user.username === msg.username ? 'flex-end' : 'flex-start'
                    }}
                  >
                    <Card style={{ backgroundColor: '#cce6ff' }}>
                      <Meta
                        avatar={
                          <Avatar style={{ color: '#ff6600', backgroundColor: '#ffe0cc' }}>
                            {msg.username[0].toUpperCase()}
                          </Avatar>
                        }
                        title={msg.username + ':'}
                        description={msg.msg}
                      />
                    </Card>
                  </div>
                )
              })}
            </div>
            <div style={{ position: 'fixed', width: '100%', left: 0, bottom: 0 }}>
              <Search
                placeholder="Press enter to send"
                color="orange"
                enterButton="Send"
                value={message}
                size="large"
                onChange={e => setMessage(e.target.value)}
                onSearch={value => sendMessage(value)}
              />
            </div>
          </Fragment>
        ) : (
            <div className="text-warning my-3">Please login to use Chat Room</div>
          )
      }
    </Fragment>
  )
}

Chat.propTypes = {
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object,
  allMessages: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.users.isAuthenticated,
  user: state.users.user,
  allMessages: state.messages
})

export default connect(mapStateToProps, { addMessage })(Chat)
