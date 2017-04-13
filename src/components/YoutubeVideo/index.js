import React from 'react'
import ReactPlayer from 'react-player'
import io from 'socket.io-client'
import './style.scss'


export default class YoutubeVideo extends React.Component {
  constructor () {
    super()

    this.socket = io()
    this.socket.on('connect', function () {
      console.log('connected to server')
    })
   
    this.socket.on('vidId change', this.recievedVidId.bind(this))

    this.state = {
      vidId: 'Aw3fN3OPk3A'       
    }
    
  }

  recievedVidId (msg) {
    console.log('recievedID: '+msg)
    this.setState({
      vidId: msg
    })
  }


  render () {
    var that = this
    var vidId = that.state.vidId
    var vidUrl = ('https://www.youtube.com/watch?v='+vidId)
    return <div className='youtube-video'>
        <h2>YoutubeVideo</h2>
        <ReactPlayer url={ vidUrl } playing />
     

      
    </div>
  }



}