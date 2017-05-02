import React from 'react'
import './style.scss'
import io from 'socket.io-client'

import {} from 'react-bootstrap'

export default class InfoUsers extends React.Component {
  constructor () {
    super(...arguments)

     this.socket = io()
    this.socket.on('connect', function () {
      console.log('connected to server')
    })

    this.socket.emit('info request')

    this.socket.on('info change', this.receivedInfo.bind(this))



    this.state = 
    {
      connectedUsers: 0,
      veto: 0

    }

        
  }

  receivedInfo (us, ve) {
    this.setState({connectedUsers: us})
    this.setState({veto: ve})
    
  }




    
  render () {
    var that = this

    return <div className='info-users'>

      <h4>Connected Users: {this.state.connectedUsers}</h4>
      <h4>Current Veto: {this.state.veto}/{Math.ceil(this.state.connectedUsers/2)}</h4>

      
      
    </div>
  }
}

//  this.setState({title: 'lovecats'})
//<div class="progress-bar" role="progressbar" aria-valuenow={(playtime/runtime)} aria-valuemin="0" aria-valuemax="100" style="width: 60%;"></div>