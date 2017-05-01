import React, { Component } from 'react'
import { HashRouter as Router, Link, Route, History } from 'react-router-dom'

import Application from './Application.js'
import Host from './Host.js'

export default class Routes extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Application}/>
          <Route exact path="/host" component={Host}/>
        </div>

      </Router>
    )
  }
}