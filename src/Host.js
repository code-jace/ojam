import React from 'react'
import Header from './components/Header'
//import GenericComponent from './components/GenericComponent'
import Chat from './components/Chat'
import InfoTitle from './components/InfoTitle'
import InfoProgressBar from './components/InfoProgressBar'
import YoutubeVideo from './components/YoutubeVideo'
import Controls from './components/Controls'
import Search from './components/Search'
import Veto from './components/Veto'
import List from './components/List'
import InfoUsers from './components/InfoUsers'

import 'bootstrap-sass/assets/stylesheets/_bootstrap.scss'
import 'bootstrap-sass/assets/javascripts/bootstrap.min.js'

import {Grid, Row, Col} from 'react-bootstrap'


import io from 'socket.io-client'


export default class Host extends React.Component {

  constructor(){
    super()

    this.socket = io()
    this.socket.on('connect', function () {
      console.log('connected to server')      
    })

    this.socket.emit('request address')

    this.socket.on('send address', (ip) =>{
      this.setState({address: ip})
    })

    this.state={'address': ''}
  }

  render () {
    return <div className='host-app'>
      
      <Grid fluid>
        <Row>
        </Row>
        <Row>
          <Col md={8} ld={8}>
          <h1>Ojam! Democratic Social Music System</h1>
          <h2>Guestlink: {this.state.address}</h2>

            <List />
          </Col>

          <Col md={4} ld={4}>
            <YoutubeVideo />
            <br/>
            <h3>Currently Playing:</h3>
            <InfoTitle />
            <InfoProgressBar />
            <Controls />
            <br/>
            <Veto />
            <br/>
            <Search />
            <h3>Information</h3>
            <InfoUsers />
          </Col>
        </Row>

      </Grid>
      
    </div>
  }
}
