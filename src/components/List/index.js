import React from 'react'
import './style.scss'
import io from 'socket.io-client'

import {Col, Grid, Table, Button} from 'react-bootstrap'


export default class List extends React.Component {
  constructor () {
    super(...arguments)

    
    this.socket = io()
    this.socket.on('connect', function () {
      console.log('connected to server')      
    })

    this.state = {
      list: []
    }

    this.socket.on('send list', (LIST) => {
    this.setState({list: LIST})
    console.log(LIST)
    console.log(this.state.list)
  })

    
  }

  

  render () {

    var that = this

    var PLAYLIST = that.state.list


    return <div className='list'>
      <Table responsive>
          <thead>
            <tr>
              <th className='col-sm-8'>Title</th>
              <th className='col-sm-2'>Uploader</th>
              <th className='col-sm-2'>Options</th>
            </tr>
          </thead>
        <tbody>
          
        </tbody>
      </Table>

      
    </div>
  }
}
