import React from 'react'
import Header from './components/Header'
import GenericComponent from './components/GenericComponent'
import Chat from './components/Chat'

export default class Application extends React.Component {
  render () {
    return <div className=''>
      <Header />
      <h1>Ojam! Democratic Social Music System</h1>
      <h2>version 0.0.1</h2>
      <GenericComponent />
      <Chat />
      <p>
        barebones hmr test
      </p>
    </div>
  }
}
