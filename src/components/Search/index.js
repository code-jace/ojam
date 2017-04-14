import React from 'react'
import './style.scss'
import io from 'socket.io-client'

export default class Search extends React.Component {
  constructor () {
    super()

    this.socket = io()
    this.socket.on('connect', function () {
      
      console.log('connected to server')
      
    })

      this.state = {
      
    }

    
  }

sendTrack(event){
  event.preventDefault()
  this.socket.emit('add track', this.idInput.value)
  console.log('Sending ID: '+this.idInput.value)
  this.idInput.value = ''
}

  render () {
    var that = this
    return <div className='search'>
        <h2>Search</h2>
        <form onSubmit={that.sendTrack.bind(this)}>
          <label>TrackId:</label>
          <input type='text' ref={(input) => { this.idInput = input }} />
          <input type='submit' value='Submit' />
        </form>
      
    </div>
  }
}
