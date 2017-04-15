import React from 'react'
import './style.scss'
import io from 'socket.io-client'

export default class List extends React.Component {
  constructor () {
    super(...arguments)

    
    this.socket = io()
    this.socket.on('connect', function () {
      console.log('connected to server')      
    })

    this.state = {
      list: []
    }

    
  }

 


  render () {
    var that = this
    return <div className='list'>
      

      
    </div>
  }
}
