import React from 'react'
import './style.scss'

export default class GenericComponent extends React.Component {
  constructor () {
    super()
    this.state = {
      clicked: 0
    }
  }
  render () {
    var that = this
    return <div className='generic-component'>
      <h2>Number of times clicked: {this.state.clicked}</h2>
      <input type='button' onClick={function () {
        that.setState({clicked: that.state.clicked + 1})
      }} value='click me' />
      <input type='button' onClick={function () {
        that.setState({clicked: 0})
      }} value='reset' />
    </div>
  }
}
