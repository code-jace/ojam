import React from 'react'
import './style.scss'
import io from 'socket.io-client'

export default class InfoClient extends React.Component {
  constructor () {
    super(...arguments)

     this.socket = io()
    this.socket.on('connect', function () {
      console.log('connected to server')
    })

    this.socket.on('title change', this.receivedTitle.bind(this))
  
    this.state = 
    {
      title: 'Add a Track!',
      runtime: 10,
      playtime: 5
    }

        
  }

  receivedTitle (msg) {
    this.setState({title: msg})
  }
    
  render () {
    var that = this
    var runtime = this.state.runtime
    var playtime = this.state.playtime
    return <div className='info-client'>
      <h2>InfoClient</h2>
      <h3>Currently Playing</h3>
      <h2>{this.state.title}</h2>
      <br/>
      <h3>Progress = {playtime/runtime}</h3>
      
      
    </div>
  }
}

//  this.setState({title: 'lovecats'})
//<div class="progress-bar" role="progressbar" aria-valuenow={(playtime/runtime)} aria-valuemin="0" aria-valuemax="100" style="width: 60%;"></div>