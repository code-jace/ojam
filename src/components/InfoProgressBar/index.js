import React from 'react'
import './style.scss'
import io from 'socket.io-client'

import {ProgressBar} from 'react-bootstrap'

export default class InfoProgressBar extends React.Component {
  constructor () {
    super(...arguments)

     this.socket = io()
    this.socket.on('connect', function () {
      console.log('connected to server')
    })

    this.socket.emit('title request')

    this.socket.on('progress update', this.recievedProgress.bind(this))


    this.state = 
    {
      progressPercent: 0
    }

        
  }


  recievedProgress (pro) {
    console.log('recieved: '+pro)
    this.setState({progressPercent: pro})
    console.log(this.state.progressPercent)
  }



    
  render () {
    var that = this

    return <div className='progressbar'>

      <ProgressBar now={this.state.progressPercent} />
      
      
    </div>
  }
}

//  this.setState({title: 'lovecats'})
//<div class="progress-bar" role="progressbar" aria-valuenow={(playtime/runtime)} aria-valuemin="0" aria-valuemax="100" style="width: 60%;"></div>