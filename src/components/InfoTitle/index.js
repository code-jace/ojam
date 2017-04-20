import React from 'react'
import './style.scss'
import io from 'socket.io-client'

import {} from 'react-bootstrap'

export default class InfoTitle extends React.Component {
  constructor () {
    super(...arguments)

     this.socket = io()
    this.socket.on('connect', function () {
      console.log('connected to server')
    })

    this.socket.emit('title request')

    this.socket.on('title change', this.receivedTitle.bind(this))



    this.state = 
    {
      title: 'Add a Track!',

    }

        
  }

  receivedTitle (msg) {
    this.setState({title: msg})
    //console.log('new title: '+msg)
  }




    
  render () {
    var that = this

    return <div className='info-title'>

      <h2>{this.state.title}</h2>

      
      
    </div>
  }
}

//  this.setState({title: 'lovecats'})
//<div class="progress-bar" role="progressbar" aria-valuenow={(playtime/runtime)} aria-valuemin="0" aria-valuemax="100" style="width: 60%;"></div>