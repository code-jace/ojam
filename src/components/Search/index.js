import React from 'react'
import './style.scss'
import io from 'socket.io-client'

import {Table, Button, FormGroup, ControlLabel, Form, FormControl, Modal} from 'react-bootstrap'


export default class Search extends React.Component {
  constructor () {
    super()

    this.socket = io()
    this.socket.on('connect', function () {
      
      console.log('connected to server')
      
    })

      this.state = {
      searchResult: [],
      modal: false
    }
    

    this.socket.on('search result', this.gotResult.bind(this)) 

  }


/* +++ Old sendTrack function for use with id submission
sendTrack(event){
    event.preventDefault()

    this.socket.emit('add track', this.idInput.value)
    console.log('Sending ID: '+this.idInput.value)
    this.idInput.value = ''
  }
  */



  sendTrack(id){
    this.socket.emit('add track', id)
    console.log('Sending ID: '+id)
    this.setState({searchResult: []}) //Empty list
  }

  searchVideos(event){
    event.preventDefault()
    console.log(this.searchInput.value)
    this.socket.emit('video lookup', this.searchInput.value)

  }

  gotResult(results){
    this.setState({searchResult: results})
    console.log(this.state.searchResult)
  }
  
  open(){
    this.setState({modal: true})
  }

  close(){
    this.setState({modal: false})
  }

  render () {
    var that = this
    var data = that.state.searchResult


    return <div className='search'>
        <h2>Search</h2>

        <Button
          bsStyle="primary"
          bsSize="large"
          block
          onClick={this.open.bind(this)}
        >
          Add to Playlist
        </Button>

        <Modal show={this.state.modal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Search for a track to add!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
                <Form inline onSubmit={that.searchVideos.bind(this)}>
                  <FormGroup >
                    <ControlLabel>Search</ControlLabel>
                    {' '}
                    <FormControl type="text" class="form-control"  placeholder="Search for a video" inputRef={(input) => { this.searchInput = input }}/>
                  </FormGroup>
                  {' '}
                  <Button type="submit">
                    Search
                  </Button>
                </Form>

                <Table responsive bordered striped>
                        <thead>
                          <tr>
                            <th className='col-sm-2'>Thumbnail</th>
                            <th className='col-sm-5'>Title</th>
                            <th className='col-sm-3'>Uploader</th>
                            <th className='col-sm-2'>Add to Playlist</th>
                          </tr>
                        </thead>
                      <tbody>
                        {data.map((d, index) => {
                          return(<tr key={index}>
                            <td><img src={d.thumbnails.default.url} width='120' height ='68' /></td>
                            <td>{d.title}</td>
                            <td>{d.channelTitle}</td>
                            <td><Button bsStyle='success' onClick={()=>this.sendTrack(d.id)}>Add</Button></td>
                            </tr>)
                        })}
                      </tbody>
                    </Table>
            
            
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>      
      
    </div>
  }
}


/* +++OLD SEARCH FOR BUILDING (ID INSERTS)+++
<Form onSubmit={that.sendTrack.bind(this)}>
          <label>TrackId:</label>
          <input type='text' ref={(input) => { this.idInput = input }} />
          <input type='submit' value='Submit' />
        </Form>

*/
