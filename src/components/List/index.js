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

    this.socket.emit('request list')

    this.socket.on('send list', this.recievedList.bind(this))

    
  }

  recievedList(msg){
    this.setState({list: msg})
  }



  removeClicked(id){
    console.log('remove '+id)
    this.socket.emit('remove track', id)
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
            return(<tr key={d.id}>
              <td><img src={d.thumb} width='192' height ='108' /></td>
              <td>{d.title}</td>
              <td><Button onClick={()=>this.removeClicked(d.id)}>Remove</Button></td>
              </tr>)
          })}


          <td></td>
        </tbody>
      </Table>

      
    </div>
  }
}
