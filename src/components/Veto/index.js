import React from 'react'
import './style.scss'
import io from 'socket.io-client'
import {Button} from 'react-bootstrap'

export default class Veto extends React.Component {
  constructor () {
    super()

    var iAmVeto = true

    this.socket = io()
    this.socket.on('connect', function () {
      console.log('connected to server')      
    })

    this.socket.on('vidId change', () =>{
      this.setState({vetoed: false})
      console.log('VETO RELOADED ')
    })

    this.state = {
      vetoed: false
    }

    
  }

  render () {
    var that = this
    return <div className='veto'>
      
      
      <Button block bsStyle="danger" bsSize="large" disabled={this.state.vetoed} onClick={function(){
        that.socket.emit('veto vote')
        that.setState({vetoed: true})
      }
        }>VETO!!</Button>
    </div>
  }
}
