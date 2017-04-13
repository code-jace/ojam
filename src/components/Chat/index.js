import React from 'react'
import io from 'socket.io-client'
import './style.scss'


export default class Chat extends React.Component {
  constructor () {
    super(...arguments)

    this.socket = io()
    this.socket.on('connect', function () {
      console.log('connected to server')
    })
    this.socket.on('chat message', this.receivedMessage.bind(this))

    this.state = {
      chatMessages: []
    }
  }


  receivedMessage (msg) {
    this.setState(function (prev) {
      prev.chatMessages.push(msg)
      return {
        chatMessages: prev.chatMessages
      }
    })
  }
  sendChatMessage (event) {
    event.preventDefault()
    this.socket.emit('chat message', this.chatInput.value)
    this.chatInput.value = ''
  }

  
  render () {
    console.log(this.state)
    return (
      <div className='chat'>
        <div className='chat-text'>
          {
            this.state.chatMessages
                .map((msg, index) => <div className='msg' key={index}>{msg}</div>)
          }
        </div>
        <form onSubmit={this.sendChatMessage.bind(this)}>
          <label>message:</label>
          <input type='text' ref={(input) => { this.chatInput = input }} />
          <input type='submit' value='Submit' />
        </form>
      </div>
    )
  }
}
