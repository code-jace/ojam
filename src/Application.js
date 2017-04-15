import React from 'react'
import Header from './components/Header'
//import GenericComponent from './components/GenericComponent'
import Chat from './components/Chat'
import InfoTitle from './components/InfoTitle'
import InfoProgressBar from './components/InfoProgressBar'
import YoutubeVideo from './components/YoutubeVideo'
import Search from './components/Search'
import Veto from './components/Veto'

import 'bootstrap-sass/assets/stylesheets/_bootstrap.scss'
import 'bootstrap-sass/assets/javascripts/bootstrap.min.js'





export default class Application extends React.Component {
  render () {
    return <div className=''>
      <h1>Ojam! Democratic Social Music System</h1>
      <InfoTitle />
      <InfoProgressBar />
      <YoutubeVideo />
      <Veto />
      <Search />
      <Chat />
      <p>
        
      </p>

      
    </div>
  }
}
