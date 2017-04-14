import React from 'react'
import './style.scss'
import io from 'socket.io-client'

export default class Veto extends React.Component {
  constructor () {
    super()

    this.socket = io()
    this.socket.on('connect', function () {
      console.log('connected to server')
      this.socket.emit('veto connected')
    })

    this.state = {
      clicked: 0
    }

        
  }



  render () {
    var that = this
    return <div className='veto'>
      
      <input type='button' onClick={function () {
        that.socket.emit('veto vote')
      }} value='veto' />
    </div>
  }
}
