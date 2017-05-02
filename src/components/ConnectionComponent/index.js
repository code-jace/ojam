import React from 'react'
import './style.scss'
import io from 'socket.io-client'

export default class ConnectionComponent extends React.Component {
  constructor () {
    super()

    this.socket = io()
    this.socket.on('connect', function () {
      console.log('connected to server')
    })
   
  }



  render () {
    var that = this
    return <div className='connection-component'>
      
    </div>
  }
}
