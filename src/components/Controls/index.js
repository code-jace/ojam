import React from 'react'

import io from 'socket.io-client'
import './style.scss'

import {Button, ButtonGroup} from 'react-bootstrap'


export default class YoutubeVideo extends React.Component {
  constructor () {
    super(...arguments)

    this.socket = io()
    this.socket.on('connect', function () {
      
      console.log('connected to server')
      
    })
    

    this.state = {
    
    }    
    
  }


  clickPlay() {
    this.socket.emit('click play')
    console.log('send play')
  }

  clickPause() {
    this.socket.emit('click pause')
    console.log('send pause')
  }  

  clickSkip() {
    this.socket.emit('click skip')
    console.log('send skip')
  }

  render () {
    var that = this    
    return <div className='controls'>
        
            <ButtonGroup>
              <Button onClick={() => this.clickPlay()}>Play</Button>
              <Button onClick={() => this.clickPause()}>Pause</Button>
              <Button onClick={() => this.clickSkip()}>Skip</Button>
            </ButtonGroup>
    </div>
  }



}