import React from 'react'
import Header from './components/Header'
//import GenericComponent from './components/GenericComponent'
import Chat from './components/Chat'
import InfoClient from './components/InfoClient'
import YoutubeVideo from './components/YoutubeVideo'
import Search from './components/Search'
import Veto from './components/Veto'



export default class Application extends React.Component {
  render () {
    return <div className=''>
      <Header />
      <h1>Ojam! Democratic Social Music System</h1>
      <InfoClient />
      <YoutubeVideo />
      <Veto />
      <Search />
      <Chat />
      <p>
        
      </p>

      
    </div>
  }
}
