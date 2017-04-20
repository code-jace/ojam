import React from 'react'
import ReactPlayer from 'react-player'
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

    this.socket.emit('video ready')
   
    this.socket.on('vidId change', this.recievedVidId.bind(this))

    this.socket.on('play', () => {
      this.setState({playing: true})
    })

    this.socket.on('pause', () => {
      this.setState({playing: false})
    })

    this.socket.on('skip', () => {

    })

    

    this.state = {
      vidId: '',  
      vidDuration: 0,
      playing: true  
    }    
    
  }

  recievedVidId (msg) {
    console.log('recievedID: '+msg)
    this.setState({
      vidId: msg
    })
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

  videoEnded() {
    console.log('VIDEO END!!')
    this.socket.emit('video ended')
  }

  reportProgress(pro){
    //console.log(this.state.vidDuration)
    //console.log(this.state.vidDuration*pro.played)
    this.socket.emit('progress', this.state.vidDuration, pro.played)

  }
  
  


  render () {
    var that = this
    var vidId = that.state.vidId
    var vidUrl = ('https://www.youtube.com/watch?v='+vidId)
    
    return <div className='youtube-video'>
        <h2>YoutubeVideo</h2>
        <ReactPlayer url={ vidUrl } playing={that.state.playing} onEnded={() => this.videoEnded()}
          onDuration={(duration) => this.setState({vidDuration: duration})}
          onProgress={(progress) => this.reportProgress(progress)}/>

          
    </div>
  }



}