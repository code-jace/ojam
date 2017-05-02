import React from 'react'
//import Header from './components/Header'
//import GenericComponent from './components/GenericComponent'
//import Chat from './components/Chat'
import InfoTitle from './components/InfoTitle'
import InfoProgressBar from './components/InfoProgressBar'
//import YoutubeVideo from './components/YoutubeVideo'
//import Controls from './components/Controls'
import Search from './components/Search'
import Veto from './components/Veto'
//import List from './components/List'
//import InfoUsers from './components/InfoUsers'
import ConnectionComponent from './components/ConnectionComponent'

import 'bootstrap-sass/assets/stylesheets/_bootstrap.scss'
import 'bootstrap-sass/assets/javascripts/bootstrap.min.js'






export default class Application extends React.Component {
  render () {
    return <div className=''>
      <h1>Ojam! Democratic Social Music System</h1>
      <h3>Currently Playing:</h3>
      <InfoTitle />
      <InfoProgressBar /> 
      <br/>
      <br/>     
      <Veto />
      <br/>
      <div className='bottomDiv'>
        <Search />
      </div>
      <ConnectionComponent /><ConnectionComponent /><ConnectionComponent /><ConnectionComponent />
    </div>
  }
}

//DISGUSTING FIX, I KNOW BUT IT WORKS (for user count)