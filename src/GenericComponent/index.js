import React from 'react'
import './style.scss'
import io from 'socket.io-client'

export default class GenericComponent extends React.Component {
  constructor () {
    super()

    this.socket = io()
    this.socket.on('connect', function () {
      console.log('connected to server')
    })

    this.state = {
      clicked: 0
    }

    
  }



  render () {
    var that = this
    return <div className='generic-component'>
      <h2>Number of times clicked: {this.state.clicked}</h2>
      <input type='button' onClick={function () {
        that.setState({clicked: that.state.clicked + 1})
      }} value='click me' />
      <input type='button' onClick={function () {
        that.setState({clicked: 0})
      }} value='reset' />
      <br/>
      <input type='button' onClick={function () {
        that.socket.emit('veto vote')
      }} value='veto' />
    </div>
  }
}
