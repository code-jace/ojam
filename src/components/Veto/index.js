import React from 'react'
import './style.scss'
import io from 'socket.io-client'

export default class Veto extends React.Component {
  constructor () {
    super()

    var iAmVeto = true

    this.socket = io()
    this.socket.on('connect', function () {
      console.log('connected to server')      
    })

    this.socket.on('vidId change', function(){
        this.reloadVeto()
    })

    this.state = {
      vetoed: false
    }

    
  }

  reloadVeto(){
    this.setState({vetoed: false})
        console.log('reload veto')
  }


  render () {
    var that = this
    return <div className='veto'>
      
      <input type='button' disabled={this.state.vetoed} onClick={function () {
        that.socket.emit('veto vote')
        //that.setState({vetoed: true})
      }} value='VETO!!' />
    </div>
  }
}
