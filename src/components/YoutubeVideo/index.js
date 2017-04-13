import React from 'react'
import ReactPlayer from 'react-player'
import './style.scss'


export default class YoutubeVideo extends React.Component {
  constructor () {
    super()


    this.state = {
      
    }
    
  }



  render () {
    var that = this
    var vidId = 'n6jCJZEFIto'
    var vidUrl = ('https://www.youtube.com/watch?v='+vidId)
    return <div className='youtube-video'>
        <h2>YoutubeVideo</h2>
        <ReactPlayer url={ vidUrl } playing />
     

      
    </div>
  }



}