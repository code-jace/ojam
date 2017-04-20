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
      list: [{
        title: 'TITLE',
        url: 'testURL'
      },
      {
        title: 'TITLE2',
        url: 'testURL2'
      }]
    }

    this.socket.on('send list', (LIST) => {
    this.setState({list: LIST})
    console.log(LIST)
    console.log(this.state.list)
  })

    
  }

  

  render () {

    var that = this

    var data = this.state.list



    return <div className='list'>
      <Table responsive bordered striped>
          <thead>
            <tr>
              <th className='col-sm-2'>Thumbnail</th>
              <th className='col-sm-8'>Title</th>
              <th className='col-sm-2'>Remove</th>
            </tr>
          </thead>
        <tbody>
          {data.map(d => {
            return(<tr>
              <td><img src={d.url}/></td>
              <td>{d.title}</td>
              <td><Button>Remove</Button></td>
              </tr>)
          })}


          <td></td>
        </tbody>
      </Table>

      
    </div>
  }
}
